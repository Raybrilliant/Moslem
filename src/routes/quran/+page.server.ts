import { getSurahList } from '$lib/server/quran';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { surahs: await getSurahList() };
};
