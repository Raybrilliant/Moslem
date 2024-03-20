export const runtime = 'edge';
const getQuran = async() => {
    const qurans = await fetch(`https://api.quran.gading.dev/surah`).then((response)=>response.json());
    return qurans;
}

export default getQuran