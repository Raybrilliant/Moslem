"use client";
import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  BookA,
  BookOpenTextIcon,
  BookType,
  ChevronLeft,
  ChevronRight,
  Settings2,
} from "lucide-react";
import PlayPauseButton from "./PlayPauseButton";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import ReadPage from "./ReadPage";
import ButtonAnimate from "./animation/ButtonAnimate";
import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "./BackButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Slider } from "./ui/slider";
import { ModeToggle } from "./ModeToggle";

const uthmani = localFont({
  src: "../public/font/Uthmanic.otf",
});

interface Surah {
  number: number;
  sequence: number;
  numberOfVerses: number;
  name: {
    transliteration: {
      en: string;
      id: string;
    };
    translation: {
      en: string;
      id: string;
    };
  };
  revelation: {
    en: string;
    id: string;
  };
  verses: [
    {
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
  ];
}

const SurahPage = ({ surah }: { surah: Surah }) => {
  const [isReading, setReading] = useState(false);
  const [isTransliteration, setTransliteration] = useState(false);
  const [slider, setSlider] = useState([24]);
  // Set Font Size
  const [fontSize, setFontSize] = useState(24);
  const clickHandle = (size: number) => {
    setFontSize(size);
    setSlider([size]);
  };
  const router = useRouter();

  // Find Ayahs
  const bookmark = useSearchParams();
  useEffect(() => {
    const targetRef = document.getElementById(bookmark.get("verse") ?? "");
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      {/* Header */}
      <div className="flex justify-between sticky top-0 z-10 bg-white dark:bg-black standalone:pt-10">
        <BackButton />
        {/* Drawer */}
        <div>
          <Drawer>
            <DrawerTrigger>
              <ButtonAnimate>
                <Button size={"icon"} variant={"outline"}>
                  <Settings2 />
                </Button>
              </ButtonAnimate>
            </DrawerTrigger>
            <DrawerContent className="container">
              <div className="mx-auto max-w-sm w-full mb-2">
                <DrawerHeader className="text-start mb-5">
                  <DrawerTitle>Setting</DrawerTitle>
                  <DrawerDescription>
                    Personalize your reading preferences
                  </DrawerDescription>
                </DrawerHeader>
                <div className="grid grid-cols-2 gap-2 px-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-center" style={{ fontSize: slider[0] }}>
                      اللَّهُ
                    </p>
                    <Slider
                      defaultValue={[fontSize]}
                      max={60}
                      step={1}
                      onValueChange={(e) => setSlider(e)}
                    />
                  </div>
                  <div className="mx-auto my-auto">
                    <ModeToggle />
                  </div>
                </div>
                <DrawerFooter className="mt-10">
                  <DrawerClose asChild>
                    <Button
                      variant={"default"}
                      size={"lg"}
                      onClick={() => clickHandle(slider[0])}
                    >
                      Save Changes
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        {/* End Drawer */}
      </div>
      {/* End Header */}

      {/* Title */}
      <Card className="p-5 text-white bg-emerald-700 relative">
        <div className="mb-4 w-[46%]">
          <h3 className="text-xl font-bold mb-2">
            {surah.name.transliteration.id}
          </h3>
          <h4>{surah.name.translation.id}</h4>
          <p className="text-xs italic capitalize">
            {surah.numberOfVerses} Verses | {surah.revelation.id}
          </p>
        </div>
        <Image
          src={"/mosque.png"}
          width={185}
          height={185}
          alt="Mosque image"
          priority={true}
          className="absolute bottom-0 right-0"
        />
        <div className="flex w-[45%] absolute gap-1">
          <ButtonAnimate>
            <Button
              size={"icon"}
              variant={"outline"}
              className="rounded-full text-black dark:text-white"
              onClick={() => setTransliteration(!isTransliteration)}
            >
              <BookType />
            </Button>
          </ButtonAnimate>
          <ButtonAnimate>
            <Button
              size={"icon"}
              variant={"outline"}
              className="rounded-full text-black dark:text-white"
              onClick={() => setReading(!isReading)}
            >
              {isReading ? <BookA /> : <BookOpenTextIcon />}
            </Button>
          </ButtonAnimate>
          <ButtonAnimate>
            <PlayPauseButton id={surah.number} />
          </ButtonAnimate>
        </div>
      </Card>
      {/* End Title */}

      {/* Read Page */}
      <h3
        className={`text-2xl text-center font-medium mt-8 mb-5 ${uthmani.className}`}
      >
        ﷽
      </h3>
      <div className=" mb-10">
        <ReadPage
          ayat={surah.verses}
          isReading={isReading}
          surah={surah.number}
          fontSize={fontSize}
          isTransliteration={isTransliteration}
        />
      </div>
      {/* End Read Page */}

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-2 standalone:mb-16">
        <ButtonAnimate>
          <Button
            className={` min-w-[12em] standalone:text-sm standalone:min-w-[10em] flex justify-between ${
              surah.number == 1 ? "hidden" : ""
            }`}
            variant={"outline"}
            onClick={() => router.replace(`/surah/${surah.number - 1}`)}
          >
            <ChevronLeft /> <span className="mx-auto">Previous</span>
          </Button>
        </ButtonAnimate>
        <ButtonAnimate>
          <Button
            className={` min-w-[12em] standalone:text-sm standalone:min-w-[10em] flex justify-between ${
              surah.number == 114 ? "hidden" : ""
            }`}
            variant={"outline"}
            onClick={() => router.replace(`/surah/${surah.number + 1}`)}
          >
            <span className="mx-auto">Next</span> <ChevronRight />
          </Button>
        </ButtonAnimate>
      </div>
      {/* End Navigation */}
    </>
  );
};

export default SurahPage;
