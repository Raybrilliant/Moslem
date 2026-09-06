// Adzan via web-push: subscribe ke push server, notifikasi dikirim server
// walau app tertutup. Suara default perangkat (tidak diatur custom).
// ponytail: kota yang tersimpan di subscription hanya disinkron tiap app dibuka.
import { getCity } from '$lib/local';
import { env } from '$env/dynamic/public';

const PUSH = env.PUBLIC_PUSH_URL || ''; // default: same-origin (di-proxy hooks.server.ts)

export function startAdzan() {
	if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
	navigator.serviceWorker.register('/sw.js');

	// Izin notifikasi butuh gesture pengguna di sebagian browser
	const ask = () => {
		document.removeEventListener('pointerdown', ask);
		Notification.requestPermission().then((p) => {
			if (p === 'granted') subscribe();
		});
	};
	document.addEventListener('pointerdown', ask, { once: true });

	// Sudah pernah izin: sinkron subscription (mis. kota berubah)
	syncPush();
}

// Dipanggil ulang saat kota berubah (mis. hasil geolocation)
export function syncPush() {
	if (typeof Notification !== 'undefined' && Notification.permission === 'granted') subscribe();
}

function urlB64ToUint8Array(b64: string) {
	const pad = '='.repeat((4 - (b64.length % 4)) % 4);
	const base64 = (b64 + pad).replace(/-/g, '+').replace(/_/g, '/');
	return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

async function subscribe() {
	try {
		const reg = await navigator.serviceWorker.ready;
		const pub = await (await fetch(`${PUSH}/vapidPublicKey`)).text();
		let sub = await reg.pushManager.getSubscription();
		sub ??= await reg.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlB64ToUint8Array(pub.trim())
		});
		await fetch(`${PUSH}/subscribe`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ subscription: sub.toJSON(), city: getCity() ?? 'Malang' })
		});
	} catch {
		// push server tidak jalan / offline: abaikan, app tetap normal
	}
}
