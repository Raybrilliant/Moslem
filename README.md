# Moslem

Jadwal sholat & Al-Qur'an (114 surah, terjemahan + tafsir Indonesia, audio, penanda bacaan). PWA ringan, dibangun dengan **SvelteKit 5 + Tailwind CSS 4 + shadcn-svelte** (style vega).

Identitas visual: emerald pekat + aksen emas, ilustrasi masjid (`day`/`night`/`mosque.png`), ornamen bintang segi delapan (`.pattern-star`), Noto Serif untuk judul, Amiri untuk teks Arab, Uthmanic untuk ayat.

## Menjalankan

```sh
bun install
bun run dev      # development
bun run build    # production build
bun run preview  # pratinjau hasil build
```

## Struktur

- `src/routes/` — halaman (`/` sholat, `/quran` daftar surah, `/surah/[id]` baca, `/about`)
- `src/lib/components/ui/` — komponen shadcn-svelte (button, card, input, badge, separator, slider, switch, accordion, drawer, skeleton)
- `src/lib/server/quran.ts` — ambil data dari api.quran.gading.dev (SSR)
- `src/lib/local.ts` — preferensi di localStorage (kota, tema, ukuran font, penanda ayat)
- Waktu sholat: api.aladhan.com (metode 20 / Kemenag), kota tersimpan di perangkat
- Audio: cdn.islamic.network (Mishary Alafasy, per surah)

## Deploy

`adapter-auto` terpasang; ganti ke `@sveltejs/adapter-cloudflare` (atau lainnya) untuk deploy ke platform tertentu.
