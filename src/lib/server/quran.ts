import type { Surah, SurahMeta } from '$lib/types';

const BASE = 'https://api.quran.gading.dev';

export async function getSurahList(): Promise<SurahMeta[]> {
	const res = await fetch(`${BASE}/surah`);
	if (!res.ok) throw new Error('Gagal memuat daftar surah');
	const json = await res.json();
	return json.data as SurahMeta[];
}

export async function getSurah(id: string): Promise<Surah> {
	const res = await fetch(`${BASE}/surah/${id}`);
	if (!res.ok) throw new Error('Surah tidak ditemukan');
	const json = await res.json();
	return json.data as Surah;
}
