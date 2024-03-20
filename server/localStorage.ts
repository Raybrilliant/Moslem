export function setBookmark(surah:number,ayahs:number){
    localStorage.setItem(`${surah}`,`${ayahs}`)
}

export function getAllBookmark(){
    return typeof window !== "undefined" && {...localStorage}
}

export function getBookmark(surah:number){
    return typeof window!=="undefined" && localStorage.getItem(`${surah}`)
}

export function deleteBookmark(surah:number){
    localStorage.removeItem(`${surah}`)
}