export interface LastRead {
	surah: number;
	verse: number;
}

export interface Settings {
	fontSize: number;
	translation: boolean;
	transliteration: boolean;
}

const LAST_READ = 'moslem:last-read';
const SETTINGS = 'moslem:settings';
const CITY = 'moslem:city';

// try/catch alih-alih typeof: Node 22+ punya global `localStorage` eksperimental
// yang bisa ada tapi tetap gagal saat dipakai.
function read<T>(key: string): T | null {
	try {
		return JSON.parse(localStorage.getItem(key) ?? 'null') as T;
	} catch {
		return null;
	}
}

function write(key: string, value: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		/* abaikan: SSR atau storage diblokir */
	}
}

export function getLastRead(): LastRead | null {
	return read<LastRead>(LAST_READ);
}

export function setLastRead(value: LastRead) {
	write(LAST_READ, value);
}

export function removeLastRead() {
	try {
		localStorage.removeItem(LAST_READ);
	} catch {
		/* abaikan */
	}
}

export function getSettings(): Settings {
	return { fontSize: 24, translation: true, transliteration: false, ...read<Settings>(SETTINGS) };
}

export function setSettings(value: Settings) {
	write(SETTINGS, value);
}

export function getCity(): string | null {
	return read<string>(CITY);
}

export function setCity(city: string) {
	write(CITY, city);
}
