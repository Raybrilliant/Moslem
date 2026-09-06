// SW minimal: agar PWA installable & bisa showNotification.
// ponytail: network-first + fallback cache (halaman lama tetap terbuka offline).
const CACHE = 'moslem-v1';

self.addEventListener('install', (e) => {
	self.skipWaiting();
	e.waitUntil(caches.open(CACHE));
});

self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (e) => {
	if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
	e.respondWith(
		fetch(e.request)
			.then((res) => {
				const copy = res.clone();
				caches.open(CACHE).then((c) => c.put(e.request, copy));
				return res;
			})
			.catch(() => caches.match(e.request))
	);
});

self.addEventListener('push', (e) => {
	const data = e.data?.json() ?? {};
	e.waitUntil(
		self.registration.showNotification(data.title ?? 'Moslem', {
			body: data.body ?? '',
			icon: '/android/android-launchericon-192-192.png',
			badge: '/ios/40.png',
			tag: 'adzan'
		})
	);
});

self.addEventListener('notificationclick', (e) => {
	e.notification.close();
	e.waitUntil(
		self.clients
			.matchAll({ type: 'window' })
			.then((list) => list[0]?.focus() ?? self.clients.openWindow('/'))
	);
});
