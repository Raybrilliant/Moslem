"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// interface Prayer {
//   Fajr: number,
//   Duha: number,
//   Dhuhr: number,
//   Asr: number,
//   Maghrib: number,
//   Isha: number,
// }

interface Prayer {
  fajr: string;
  shurooq: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const CountdownPray = ({ times }: { times: Prayer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    navigator.serviceWorker.register("/sw.js");
  });

  // Create Array
  const prayName = ["Fajr", "Duha", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const prayTimes = Object.values(times);

  // Countdown
  var date = new Date();
  var time = prayTimes[currentIndex == 5 ? 0 : currentIndex + 1]
    .toString()
    .split(":");

  var targetTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(time[0]),
    Number(time[1]),
    30
  );
  if (currentIndex == 5) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  var currentTime = new Date();
  var distance = targetTime.getTime() - currentTime.getTime();
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  useEffect(() => {
    if (distance < 0) {
      if (currentIndex == 5) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [currentIndex]);

  return (
    <>
      <Image
        src={currentIndex < 1 || currentIndex > 3 ? "/night.png" : "/day.png"}
        width={500}
        height={500}
        alt="Mosque with time background for prayer time"
        priority={true}
        className="mx-auto my-5"
      ></Image>
      <p className="text-sm text-emerald-500">
        {hours} hr {minutes} min until
      </p>
      <div className="flex justify-between align-middle">
        <h3 className="text-3xl font-medium">
          {prayName[currentIndex == 5 ? 0 : currentIndex + 1]}
        </h3>
        <h3 className="text-3xl font-medium">
          {prayTimes[currentIndex == 5 ? 0 : currentIndex + 1]}
        </h3>
      </div>
    </>
  );
};

export default CountdownPray;
