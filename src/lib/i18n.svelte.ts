// i18n mini: dict flat + state reaktif. Tambah bahasa = tambah entry dict.
// ponytail: konten Qur'an (terjemahan/tafsir) tetap dari API (ID) — yang
// diterjemahkan hanya UI chrome. Ganti API berbahasa kalau nanti perlu.
export const i18n = $state({ lang: 'id' as 'id' | 'en' });

type Dict = Record<string, string>;

const id: Dict = {
	'nav.prayer': 'Sholat',
	'nav.quran': "Al-Qur'an",
	'nav.qibla': 'Kiblat',
	'nav.about': 'Tentang',

	'home.title': 'Moslem — Jadwal Sholat',
	'home.desc': 'Jadwal waktu sholat dan Al-Qur\'an',
	'home.cityPlaceholder': 'Nama kota, mis. Malang',
	'home.save': 'Simpan',
	'home.failed': 'Gagal memuat jadwal untuk',
	'home.retry': 'Coba Lagi',
	'home.until': 'Menuju waktu',
	'home.at': 'pukul',
	'home.next': 'Berikutnya',
	'home.locating': 'Mendeteksi lokasi…',

	'p.Fajr': 'Subuh',
	'p.Sunrise': 'Terbit',
	'p.Dhuhr': 'Dzuhur',
	'p.Asr': 'Ashar',
	'p.Maghrib': 'Maghrib',
	'p.Isha': 'Isya',

	'scene.night': 'malam',
	'scene.dawn': 'subuh',
	'scene.morning': 'pagi',
	'scene.day': 'siang',
	'scene.dusk': 'senja',
	'scene.maghrib': 'maghrib',

	'quran.title': "Al-Qur'an",
	'quran.subtitle': '114 surah • terjemahan & tafsir Indonesia',
	'quran.search': "Cari surah… (mis. Al-Kahf atau 18)",
	'quran.continue': 'Lanjutkan Membaca',
	'quran.verses': 'ayat',
	'quran.notFound': 'tidak ditemukan.',
	'quran.back': 'Kembali ke daftar surah',

	'surah.title': 'Pengaturan Baca',
	'surah.desc': 'Matikan terjemahan untuk mode mushaf (baca menyambung kanan ke kiri).',
	'surah.fontSize': 'Ukuran font Arab',
	'surah.translation': 'Terjemahan',
	'surah.transliteration': 'Transliterasi',
	'play': 'Putar Audio',
	'stop': 'Berhenti',
	'prev': 'Sebelumnya',
	'next': 'Berikutnya',
	'tafsir.title': 'Tafsir Ayat',
	'tafsir.of': 'Surah',
	'aria.tafsir': 'Lihat tafsir ayat',
	'aria.bookmark': 'Tandai ayat',
	'scene.label': 'Ilustrasi masjid pada suasana',

	'qibla.title': 'Kompas Kiblat',
	'qibla.desc': 'Hadapkan ponsel hingga panah emas menunjuk ke atas',
	'qibla.enable': 'Aktifkan Kompas',
	'qibla.denied': 'Izin sensor kompas ditolak.',
	'qibla.aligned': '✓ Anda menghadap kiblat',
	'qibla.heading': 'Hadap',
	'qibla.bearing': 'Kiblat',
	'qibla.kmTo': "km ke Ka'bah",
	'qibla.noLocation': 'Tidak bisa menentukan lokasi. Izinkan akses lokasi, lalu muat ulang halaman.',

	'about.title': 'Tentang',
	'about.desc': 'Tentang aplikasi Moslem',
	'about.body':
		'Aplikasi yang dibuat oleh developer Muslim Indonesia sebagai ruang ibadah yang aman dan nyaman — bebas dari spyware dan iklan yang tidak pantas. Menemani keseharianmu dengan jadwal sholat dan bacaan Al-Qur\'an.',
	'about.mission': 'Misi Kami',
	'about.missionBody':
		'Memberdayakan umat Muslim melalui teknologi — mempererat hubungan hamba dengan Allah (habluminallah) dan antar sesama (habluminannas). Saat ini Moslem fokus menyediakan jadwal sholat dan sumber bacaan Al-Qur\'an.',
	'about.privacy': 'Kebijakan Privasi',
	'about.privacyBody':
		'Privasi adalah prioritas kami. Kami tidak mengumpulkan data apa pun — analitik, data pribadi, alamat IP, maupun GPS. Preferensi kamu (kota, tema, ukuran font, penanda bacaan) tersimpan hanya di perangkatmu sendiri.',
	'about.madeIn': 'Dibuat dengan',

	'error.back': 'Kembali ke Beranda'
};

const en: Dict = {
	'nav.prayer': 'Prayer',
	'nav.quran': "Qur'an",
	'nav.qibla': 'Qibla',
	'nav.about': 'About',

	'home.title': 'Moslem — Prayer Times',
	'home.desc': "Prayer times and the Noble Qur'an",
	'home.cityPlaceholder': 'City name, e.g. Malang',
	'home.save': 'Save',
	'home.failed': 'Failed to load schedule for',
	'home.retry': 'Retry',
	'home.until': 'Time until',
	'home.at': 'at',
	'home.next': 'Next',
	'home.locating': 'Detecting location…',

	'p.Fajr': 'Fajr',
	'p.Sunrise': 'Sunrise',
	'p.Dhuhr': 'Dhuhr',
	'p.Asr': 'Asr',
	'p.Maghrib': 'Maghrib',
	'p.Isha': 'Isha',

	'scene.night': 'night',
	'scene.dawn': 'dawn',
	'scene.morning': 'morning',
	'scene.day': 'daytime',
	'scene.dusk': 'dusk',
	'scene.maghrib': 'maghrib',

	'quran.title': "The Qur'an",
	'quran.subtitle': '114 surahs • translation & tafsir',
	'quran.search': 'Search surah… (e.g. Al-Kahf or 18)',
	'quran.continue': 'Continue Reading',
	'quran.verses': 'verses',
	'quran.notFound': 'not found.',
	'quran.back': 'Back to surah list',

	'surah.title': 'Reading Settings',
	'surah.desc': 'Turn off translation for mushaf mode (continuous right-to-left reading).',
	'surah.fontSize': 'Arabic font size',
	'surah.translation': 'Translation',
	'surah.transliteration': 'Transliteration',
	'play': 'Play Recitation',
	'stop': 'Stop',
	'prev': 'Previous',
	'next': 'Next',
	'tafsir.title': 'Tafsir of Verse',
	'tafsir.of': 'Surah',
	'aria.tafsir': 'View tafsir of verse',
	'aria.bookmark': 'Bookmark verse',
	'scene.label': 'Mosque illustration in the',

	'qibla.title': 'Qibla Compass',
	'qibla.desc': 'Point your phone until the golden arrow faces up',
	'qibla.enable': 'Enable Compass',
	'qibla.denied': 'Compass sensor permission denied.',
	'qibla.aligned': '✓ You are facing the qibla',
	'qibla.heading': 'Heading',
	'qibla.bearing': 'Qibla',
	'qibla.kmTo': "km to the Ka'bah",
	'qibla.noLocation': "Can't determine your location. Allow location access, then reload the page.",

	'about.title': 'About',
	'about.desc': 'About the Moslem app',
	'about.body':
		"Created by an Indonesian Muslim developer as a safe, comfortable space for worship — free from spyware and intrusive ads. Your daily companion for prayer times and Quran reading.",
	'about.mission': 'Our Mission',
	'about.missionBody':
		'Empowering Muslims through technology — strengthening the bond between servants and Allah (habluminallah) and among fellow human beings (habluminannas). For now, Moslem focuses on prayer times and the Quran.',
	'about.privacy': 'Privacy Policy',
	'about.privacyBody':
		'Privacy is our priority. We do not collect any data — no analytics, personal data, IP addresses, or GPS. Your preferences (city, theme, font size, bookmarks) are stored only on your own device.',
	'about.madeIn': 'Made with',

	'error.back': 'Back to Home'
};

const dicts: Record<'id' | 'en', Dict> = { id, en };

export type Lang = 'id' | 'en';

export function setLang(l: Lang) {
	i18n.lang = l;
	try {
		localStorage.setItem('moslem:lang', l);
	} catch {}
}

// Dipanggil sekali dari layout (efek sisi klien) — pulihkan bahasa tersimpan
export function initLang() {
	try {
		const saved = localStorage.getItem('moslem:lang');
		if (saved === 'en' || saved === 'id') i18n.lang = saved;
	} catch {}
}

export function toggleLang() {
	setLang(i18n.lang === 'id' ? 'en' : 'id');
}

export const locale = () => (i18n.lang === 'en' ? 'en-US' : 'id-ID');

export const t = (key: string) => dicts[i18n.lang][key] ?? dicts.id[key] ?? key;
