import BottomNavbar from "@/components/BottomNavbar";
import CountdownPray from "@/components/CountdownPray";
import { Navigation } from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";
import { headers } from "next/headers";
import { prayerTimeV2, prayerTimeV3 } from "@/server/prayerTime";
// interface Prayer {
//   data:{
//     timings: {
//       Fajr: number,
//       Sunrise: number,
//       Dhuhr: number,
//       Asr: number,
//       Sunset: number,
//       Maghrib: number,
//       Isha: number,
//       Imsak: number,
//       Midnight: number,
//       Firstthird: number,
//       Lastthird: number
//     }
//   }
// }

interface PrayerV2 {
  results: {
    Fajr: number;
    Duha: number;
    Dhuhr: number;
    Asr: number;
    Maghrib: number;
    Isha: number;
  };
  settings: {
    location: {
      city: string;
    };
  };
}

interface Prayer {
  query: string;
  items: [
    {
      fajr: string;
      shurooq: string;
      dhuhr: string;
      asr: string;
      maghrib: string;
      isha: string;
    }
  ];
}

// Function to convert 12-hour time to 24-hour time
function convertTo24Hour(time12h: string) {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "pm") {
    hours = String(parseInt(hours, 10) + 12);
  }

  return hours + ":" + minutes;
}

// Function to convert all times in the items array
function convertPrayerTimes(prayer: Prayer) {
  const items = prayer.items.map((item) => ({
    fajr: convertTo24Hour(item.fajr),
    shurooq: convertTo24Hour(item.shurooq),
    dhuhr: convertTo24Hour(item.dhuhr),
    asr: convertTo24Hour(item.asr),
    maghrib: convertTo24Hour(item.maghrib),
    isha: convertTo24Hour(item.isha),
  }));

  return {
    ...prayer,
    items: items,
  };
}
export const runtime = "edge";
export default async function Home() {
  const ip = headers().get("cf-connecting-ip");
  const geo = await fetch("http://ip-api.com/json/" + ip).then((res) =>
    res.json()
  );
  const prayers: Prayer = await prayerTimeV3("Malang");
  
  if (prayers) {
    const prayer = convertPrayerTimes(prayers);
    // const prayers:Prayer = await prayerTime(req.geo?.city ?? 'Malang',req.geo?.country ?? 'id')
    return (
      <>
        <div className="container py-5 min-h-screen">
          <Suspense fallback={<Loading />}>
            <div className="flex justify-between standalone:mt-10">
              <h1 className="text-3xl font-medium">Prayer</h1>
              <h3 className="text-sm font-medium text-emerald-500 my-auto">
                <span className=" inline-block me-1 align-middle">
                  <Navigation size={14} />
                </span>
                {prayer.query}
              </h3>
            </div>
            <CountdownPray times={prayer.items[0]} />
            <div className="divide-y divide-slate-200 my-2 mb-10">
              <div className="flex justify-between align-middle py-3">
                <h3 className="text-lg font-medium">Fajr</h3>
                <h3 className="text-lg font-medium">{prayer.items[0].fajr}</h3>
              </div>
              <div className="flex justify-between align-middle py-3">
                <h3 className="text-lg font-medium">Duha</h3>
                <h3 className="text-lg font-medium">
                  {prayer.items[0].shurooq}
                </h3>
              </div>
              <div className="flex justify-between align-middle py-3">
                <h3 className="text-lg font-medium">Dhuhr</h3>
                <h3 className="text-lg font-medium">{prayer.items[0].dhuhr}</h3>
              </div>
              <div className="flex justify-between align-middle py-3">
                <h3 className="text-lg font-medium">Asr</h3>
                <h3 className="text-lg font-medium">{prayer.items[0].asr}</h3>
              </div>
              <div className="flex justify-between align-middle py-3">
                <h3 className="text-lg font-medium">Maghrib</h3>
                <h3 className="text-lg font-medium">
                  {prayer.items[0].maghrib}
                </h3>
              </div>
              <div className="flex justify-between align-middle py-3">
                <h3 className="text-lg font-medium">Isha</h3>
                <h3 className="text-lg font-medium">{prayer.items[0].isha}</h3>
              </div>
            </div>
          </Suspense>
        </div>
        <BottomNavbar />
      </>
    );
  } else {
   const prayers: PrayerV2 = await prayerTimeV2(!ip ? "125.163.129.14" : ip);
   return (
    <>
      <div className="container py-5 min-h-screen">
        <Suspense fallback={<Loading />}>
          <div className="flex justify-between standalone:mt-10">
            <h1 className="text-3xl font-medium">Prayer</h1>
            <h3 className="text-sm font-medium text-emerald-500 my-auto">
              <span className=" inline-block me-1 align-middle">
                <Navigation size={14} />
              </span>
              {prayers.settings.location.city}
            </h3>
          </div>
          <CountdownPray times={prayers.results} />
          <div className="divide-y divide-slate-200 my-2 mb-10">
            <div className="flex justify-between align-middle py-3">
              <h3 className="text-lg font-medium">Fajr</h3>
              <h3 className="text-lg font-medium">{prayers.results.Fajr}</h3>
            </div>
            <div className="flex justify-between align-middle py-3">
              <h3 className="text-lg font-medium">Duha</h3>
              <h3 className="text-lg font-medium">
                {prayers.results.Duha}
              </h3>
            </div>
            <div className="flex justify-between align-middle py-3">
              <h3 className="text-lg font-medium">Dhuhr</h3>
              <h3 className="text-lg font-medium">{prayers.results.Dhuhr}</h3>
            </div>
            <div className="flex justify-between align-middle py-3">
              <h3 className="text-lg font-medium">Asr</h3>
              <h3 className="text-lg font-medium">{prayers.results.Asr}</h3>
            </div>
            <div className="flex justify-between align-middle py-3">
              <h3 className="text-lg font-medium">Maghrib</h3>
              <h3 className="text-lg font-medium">
                {prayers.results.Maghrib}
              </h3>
            </div>
            <div className="flex justify-between align-middle py-3">
              <h3 className="text-lg font-medium">Isha</h3>
              <h3 className="text-lg font-medium">{prayers.results.Isha}</h3>
            </div>
          </div>
        </Suspense>
      </div>
      <BottomNavbar />
    </>
  );
  }
}
