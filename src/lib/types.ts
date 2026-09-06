export interface SurahMeta {
	number: number;
	numberOfVerses: number;
	name: {
		short: string;
		long: string;
		transliteration: { en: string; id: string };
		translation: { en: string; id: string };
	};
	revelation: { en: string; id: string };
}

export interface Ayah {
	number: { inQuran: number; inSurah: number };
	text: { arab: string; transliteration: { en: string } };
	translation: { en: string; id: string };
	tafsir: { id: { short: string; long: string } };
}

export interface Surah extends SurahMeta {
	sequence: number;
	verses: Ayah[];
}
