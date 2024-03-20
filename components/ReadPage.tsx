"use client";
import { BookOpenIcon, BookmarkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import localFont from "next/font/local";
import PageAnimate from "./animation/PageAnimate";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import ButtonAnimate from "./animation/ButtonAnimate";
import {
  deleteBookmark,
  getBookmark,
  setBookmark,
} from "@/server/localStorage";
import TransliterationAnimate from "./animation/TransliterationAnimate";

const uthmani = localFont({
  src: "../public/font/Uthmanic.otf",
});

interface Ayat {
  number: {
    inQuran: number;
    inSurah: number;
  };
  text: {
    arab: string;
    transliteration: {
      en: string;
    };
  };
  translation: {
    en: string;
    id: string;
  };
  tafsir: {
    id: {
      short: string;
      long: string;
    };
  };
}

const ReadPage = ({
  ayat,
  isReading,
  surah,
  fontSize,
  isTransliteration,
}: {
  ayat: Ayat[];
  isReading: boolean;
  surah: number;
  fontSize: number;
  isTransliteration: boolean;
}) => {
  const [isSaved, setSaved] = useState(Number(getBookmark(surah)));
  const clickHandle = (ayahs: number) => {
    if (isSaved == ayahs) {
      setSaved(0);
      deleteBookmark(surah);
    } else {
      setSaved(ayahs);
      setBookmark(surah, ayahs);
    }
  };

  if (!isReading) {
    return ayat.map((ayat) => (
      <div key={ayat.number.inQuran} id={`${ayat.number.inSurah}`}>
        <Card className="p-1 px-6 bg-emerald-50 border-none rounded-sm flex justify-between my-5">
          <p className="font-medium my-auto">{ayat.number.inSurah}</p>
          {/* Drawer Tafsir */}
          <div className="flex flex-row space-x-2">
            <Drawer>
              <DrawerTrigger>
                <ButtonAnimate>
                  <BookOpenIcon />
                </ButtonAnimate>
              </DrawerTrigger>
              <DrawerContent className="container max-h-[80%]">
                <div className="w-full max-w-sm overflow-auto mb-2">
                  <DrawerHeader className="text-start flex flex-col space-y-2">
                    <DrawerTitle>Tafsir</DrawerTitle>
                    <DrawerDescription>
                      Meanings and wisdom behind the verses of the Quran
                    </DrawerDescription>
                  </DrawerHeader>
                  <p className="text-justify p-4">{ayat.tafsir.id.short}</p>
                </div>
              </DrawerContent>
            </Drawer>
            {/* End Drawer */}
            <Button
              className="my-auto"
              size={"icon"}
              variant={isSaved == ayat.number.inSurah ? "default" : "ghost"}
              onClick={() => clickHandle(ayat.number.inSurah)}
            >
              <BookmarkIcon />
            </Button>
          </div>
        </Card>
        <div className="grid gap-3">
          <p
            className={`text-right font-medium ${uthmani.className}`}
            style={{ fontSize: fontSize }}
          >
            {ayat.text.arab}
          </p>
          {isTransliteration && (
            <TransliterationAnimate>
              <p
                className="text-justify font-medium text-emerald-600 dark:text-white"
                style={{ fontSize: fontSize - 10 }}
              >
                {ayat.text.transliteration.en}
              </p>
            </TransliterationAnimate>
          )}
          <p className="text-justify" style={{ fontSize: fontSize - 10 }}>
            {ayat.translation.id}
          </p>
        </div>
      </div>
    ));
  } else {
    return (
      <PageAnimate>
        <div className="grid gap-2 divide-y justify-center">
          {ayat.map((ayat) => (
            <p
              className={`font-medium text-center py-2 ${uthmani.className}`}
              key={ayat.number.inQuran}
              style={{ fontSize: fontSize }}
            >
              {ayat.text.arab} {ayat.number.inSurah.toLocaleString("ar-EG")}
            </p>
          ))}
        </div>
      </PageAnimate>
    );
  }
};

export default ReadPage;
