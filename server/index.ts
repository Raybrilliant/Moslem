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
const FIRED_FILE = new URL('../data/fired.json', import.meta.url);
let subs: Sub[] = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : [];
const fired = new Set<string>(
	existsSync(FIRED_FILE) ? JSON.parse(readFileSync(FIRED_FILE, 'utf8')) : []
);

const save = () => {
	mkdirSync(new URL('../data/', import.meta.url), { recursive: true });
	writeFileSync(FILE, JSON.stringify(subs, null, 2));
};
const saveFired = () => {
	mkdirSync(new URL('../data/', import.meta.url), { recursive: true });
	writeFileSync(FIRED_FILE, JSON.stringify([...fired], null, 2));
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

async function loadTimings(city: string, day: string) {
	try {
		const res = await fetch(
			`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Indonesia&method=20`
		);
		const json = await res.json();
		if (json.code === 200) dayCache.set(city, { day, timings: json.data.timings });
	} catch {}
}

// Semua waktu dihitung dalam WIB (zona timings aladhan), apa pun TZ container.
// Dulu pakai jam lokal server: container UTC -> tidak pernah match / salah waktu.
const hmFmt = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Asia/Jakarta',
	hour12: false,
	hourCycle: 'h23',
	hour: '2-digit',
	minute: '2-digit'
});
const dayFmt = new Intl.DateTimeFormat('en-CA', {
	timeZone: 'Asia/Jakarta',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
});
const toMin = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5));

// ponytail: jendela kirim 10 menit setelah waktu sholat. Dulu match menit persis:
// tick telat satu menit saja (redeploy, fetch lambat) -> notifikasi hangus.
const GRACE = 10;

async function tick() {
	const now = new Date();
	const cur = toMin(hmFmt.format(now));
	const day = dayFmt.format(now);
	for (const city of new Set(subs.map((s) => s.city))) {
		let c = dayCache.get(city);
		if (!c || c.day !== day) {
			await loadTimings(city, day);
			c = dayCache.get(city);
		}
		if (!c) continue;
		for (const [key, label] of Object.entries(LABELS)) {
			const t = c.timings[key]?.slice(0, 5);
			if (!t) continue;
			const id = `${city}-${key}-${day}`;
			const late = cur - toMin(t);
			if (fired.has(id) || late < 0 || late > GRACE) continue;
			fired.add(id);
			console.log(`[adzan] ${day} ${city}: kirim ${label} ${t} (telat ${late} mnt)`);
			await pushCity(city, `Masuk waktu ${label}`, `${label} pukul ${t} WIB — ${city}`);
		}
	}
	// buang id hari-hari lama biar file tetap kecil
	for (const id of fired) if (!id.endsWith(day)) fired.delete(id);
	saveFired();
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
