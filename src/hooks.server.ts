import type { Handle } from '@svelte/kit';

// Proxy push API ke push server internal (127.0.0.1:5175) — same-origin,
// jadi browser tidak butuh domain/CORS terpisah.
const PUSH_PATHS = new Set(['/vapidPublicKey', '/subscribe']);
const PUSH_UPSTREAM = 'http://127.0.0.1:5175';

export const handle: Handle = async ({ event, resolve }) => {
	if (PUSH_PATHS.has(event.url.pathname)) {
		return fetch(`${PUSH_UPSTREAM}${event.url.pathname}`, {
			method: event.request.method,
			headers: event.request.headers,
			body: event.request.body,
			// @ts-expect-error: duplex wajib untuk stream body di undici
			duplex: 'half'
		});
	}
	return resolve(event);
};
