// Cache Qur'an di SQLite (bun:sqlite): API eksternal dihitung sekali per surah,
// sisanya dari DB. Teks Qur'an tidak berubah -> tanpa TTL.
// ponytail: hapus data/quran.sqlite kalau mau refresh paksa.
import { Database } from 'bun:sqlite';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Surah, SurahMeta } from '$lib/types';

const BASE = 'https://api.quran.gading.dev';

// cwd = project root saat dev, /app saat jalan di Docker -> volume data/ sama
mkdirSync(resolve(process.cwd(), 'data'), { recursive: true });
const db = new Database(resolve(process.cwd(), 'data/quran.sqlite'));
db.run('CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, json TEXT)');

const get = db.query('SELECT json FROM cache WHERE key = ?');
const put = db.query('INSERT OR REPLACE INTO cache (key, json) VALUES (?, ?)');

async function cached<T>(key: string, url: string): Promise<T> {
	const hit = get.get(key) as { json: string } | null;
	if (hit) return JSON.parse(hit.json);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Gagal memuat ${key}`);
	const data = (await res.json()).data as T;
	put.run(key, JSON.stringify(data));
	return data;
}

export const getSurahList = () => cached<SurahMeta[]>('surah', `${BASE}/surah`);
export const getSurah = (id: string) => cached<Surah>(`surah/${id}`, `${BASE}/surah/${id}`);
