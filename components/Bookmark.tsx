import { getAllBookmark } from "@/server/localStorage";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Link from "next/link";

interface Name {
  numberOfVerses: number,
  name: {
    transliteration: {
      en: string;
      id: string;
    };
  },
  revelation: {
    en: string,
    id: string
  }
}

const Bookmark = ({surah} : {surah:Name[]}) => {
  const getBookmark = getAllBookmark();
  const bookmark = Object.entries(getBookmark).filter((item)=>item[0] !== 'theme');  
  bookmark.reverse()
  
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {bookmark.map((item:any) => (
            <CarouselItem key={item.surah} className="basis-1/2">
              <Link href={`/surah/${item[0]}?verse=${item[1]}`}>
                <Card className=" bg-emerald-700 text-white grid gap-2 p-4">
                  <h3 className="text-lg font-medium">{surah[item[0]-1].name.transliteration.id}</h3>
                  <p className="text-sm">{surah[item[0]-1].numberOfVerses} Verses | {surah[item[0]-1].revelation.id}</p>
                  <p className="text-sm">Your last verse is {item[1]}</p>
                </Card>
              </Link>
            </CarouselItem>
          ))}
          <CarouselItem>
            <Card className=" bg-emerald-700 text-white grid gap-2 p-4">
              <h3 className="text-lg font-medium">Hai..</h3>
              <p className="text-sm">
                Thank u for try this app in the early development stage, feel
                free to let me know if there are any bugs
              </p>
              <p className="text-sm"></p>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Bookmark;
