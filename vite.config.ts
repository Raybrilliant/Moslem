import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// biar 'bun:sqlite' tetap jadi import runtime (server prod jalan pakai Bun)
	ssr: { external: ['bun:sqlite'] }
});
