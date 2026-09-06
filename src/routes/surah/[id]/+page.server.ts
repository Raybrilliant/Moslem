import { error } from '@sveltejs/kit';
import { getSurah } from '$lib/server/quran';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isInteger(id) || id < 1 || id > 114) {
		error(404, 'Surah tidak ditemukan');
	}
	try {
		return { surah: await getSurah(String(id)) };
	} catch {
		error(502, 'Gagal memuat surah, coba lagi');
	}
};
