export const runtime = 'edge';
const getSurah = async (id:string) => {
    const surah = await fetch(`https://api.quran.gading.dev/surah/${id}`).then((response)=>response.json());
    return surah
}

export default getSurah