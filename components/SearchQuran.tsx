"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import Link from "next/link";
import ButtonAnimate from "./animation/ButtonAnimate";
import Bookmark from "./Bookmark";
import localFont from "next/font/local";

interface Quran {
    number: number,
    numberOfVerses: number,
    name: {
      transliteration: {
        en: string,
        id: string
      },
      translation: {
        en: string,
        id: string
      }
    },
    revelation: {
      en: string,
      id: string
    },
}

const uthmani = localFont({
  src: "../public/font/Uthmanic.otf",
});

const SearchQuran = ({ surah }: { surah: Quran[] }) => {
  
  const [search, setSearch] = useState("");
  const filtered = surah.filter((item) => {
    return Object.values(item.name.transliteration)
      .join("")
      .toLocaleLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <>
      <div className="mb-5">
        <h1 className="mb-5 text-3xl font-medium">Quran</h1>
        <Input
          type="search"
          placeholder="Search.."
          onKeyUpCapture={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      <Card className="rounded-none p-5 border-y-2 border-x-0 mx-[-2rem]">
        <h3 className="mb-5 text-lg font-medium">Last Read</h3>
        <Bookmark surah={surah}/>
      </Card>

      <div className="my-5">
        <h3 className="mb-5 font-medium text-lg">Surah</h3>
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((quran) => (
            <Link href={`surah/${quran.number}`} key={quran.number}>
              <ButtonAnimate>
              <Card className="p-3 bg-emerald-600 text-white">
                <div className="flex justify-between">
                  <div>
                <h3 className="font-medium">{quran.name.transliteration.id}</h3>
                <p className="text-sm">{quran.numberOfVerses} Verses</p>
                <p className="text-sm">{quran.revelation.id}</p>
                  </div>
                  <div>
                    <p className={` text-4xl ${uthmani.className}`}>{quran.number.toLocaleString("ar-EG")}</p>
                  </div>
                </div>
              </Card>
              </ButtonAnimate>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchQuran;
