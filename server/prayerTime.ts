export const runtime = 'edge';
export const prayerTime = async (city:string,country:string) => {
  return await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=20`).then((response)=>response.json())
}

export const prayerTimeV2 = async (ip:string|null) => {
  if (ip == '::1') {
    return await fetch(`http://www.islamicfinder.us/index.php/api/prayer_times?user_ip=125.163.129.14&method=12&time_format=0`).then((res)=>res.json())
  } else {
    return await fetch(`http://www.islamicfinder.us/index.php/api/prayer_times?user_ip=${ip}&method=12&time_format=0`).then((res)=>res.json())
  }
}

export const prayerTimeV3 = async(city:string) => {
  try {
    return await fetch(`https://muslimsalat.com/${city}/daily/5.json?key=0f9c2cc71fb0b31195448d90881e243c`).then((res)=>res.json())
  }
   catch (error) {
    return undefined
  }
}