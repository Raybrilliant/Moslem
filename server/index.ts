// Server push adzan — jalankan: bun server/index.ts
// ponytail: subscription disimpan di file JSON; kalau butuh multi-instance,
// pindah ke SQLite/DB dan hapus `fired` in-memory (restart = bisa kirim dobel).
import webpush from 'web-push';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const PUB = process.env.VAPID_PUBLIC_KEY;
const PRIV = process.env.VAPID_PRIVATE_KEY;
if (!PUB || !PRIV) {
	console.error('Set VAPID_PUBLIC_KEY & VAPID_PRIVATE_KEY di .env');
	process.exit(1);
}
webpush.setVapidDetails('mailto:admin@example.com', PUB, PRIV);

type Sub = { endpoint: string; keys: { p256dh: string; auth: string }; city: string };
const FILE = new URL('../data/subscriptions.json', import.meta.url);
let subs: Sub[] = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : [];

const save = () => {
	mkdirSync(new URL('../data/', import.meta.url), { recursive: true });
	writeFileSync(FILE, JSON.stringify(subs, null, 2));
};

const LABELS: Record<string, string> = {
	Fajr: 'Subuh',
	Sunrise: 'Terbit',
	Dhuhr: 'Dzuhur',
	Asr: 'Ashar',
	Maghrib: 'Maghrib',
	Isha: 'Isya'
};

const dayCache = new Map<string, { day: string; timings: Record<string, string> }>();
const fired = new Set<string>();

async function loadTimings(city: string, day: string) {
	try {
		const res = await fetch(
			`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Indonesia&method=20`
		);
		const json = await res.json();
		if (json.code === 200) dayCache.set(city, { day, timings: json.data.timings });
	} catch {}
}

async function tick() {
	const now = new Date();
	const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
	const day = now.toISOString().slice(0, 10);
	for (const city of new Set(subs.map((s) => s.city))) {
		let c = dayCache.get(city);
		if (!c || c.day !== day) {
			await loadTimings(city, day);
			c = dayCache.get(city);
		}
		if (!c) continue;
		for (const [key, label] of Object.entries(LABELS)) {
			const t = c.timings[key]?.slice(0, 5);
			const id = `${city}-${key}-${day}`;
			if (!t || t !== hm || fired.has(id)) continue;
			fired.add(id);
			await pushCity(city, `Masuk waktu ${label}`, `${label} pukul ${t} WIB — ${city}`);
		}
	}
}

async function pushCity(city: string, title: string, body: string) {
	const payload = JSON.stringify({ title, body });
	const dead: string[] = [];
	await Promise.all(
		subs
			.filter((s) => s.city === city)
			.map(async (s) => {
				try {
					await webpush.sendNotification(s, payload);
				} catch (err: any) {
					// subscription kadaluarsa/uninstall -> buang
					if (err?.statusCode === 404 || err?.statusCode === 410) dead.push(s.endpoint);
				}
			})
	);
	if (dead.length) {
		subs = subs.filter((s) => !dead.includes(s.endpoint));
		save();
	}
}

// CORS manual agar client SvelteKit (port lain) bisa akses
const cors = {
	'access-control-allow-origin': '*',
	'access-control-allow-methods': 'GET, POST',
	'access-control-allow-headers': 'content-type'
};

const PORT = Number(process.env.PORT ?? 5175);

Bun.serve({
	port: PORT,
	async fetch(req) {
		const { pathname } = new URL(req.url);
		if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
		if (pathname === '/vapidPublicKey') return new Response(PUB, { headers: cors });
		if (pathname === '/subscribe' && req.method === 'POST') {
			try {
				const { subscription, city } = await req.json();
				if (!subscription?.endpoint) return new Response('bad request', { status: 400, headers: cors });
				subs = subs.filter((s) => s.endpoint !== subscription.endpoint);
				subs.push({ ...subscription, city: city || 'Malang' });
				save();
				return new Response('ok', { headers: cors });
			} catch {
				return new Response('bad request', { status: 400, headers: cors });
			}
		}
		return new Response('Moslem push server', { headers: cors });
	}
});

console.log(`Push server jalan di :${PORT}`);
setInterval(tick, 60_000);
tick();
