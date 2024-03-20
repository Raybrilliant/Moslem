'use client'
import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import { BadgeInfo, BookOpen, Compass, HomeIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const active = usePathname();
  return (
    <footer>
      <Card className="flex py-2 justify-around fixed bottom-0 z-10 w-full border-x-0 border-b-0 rounded-none standalone:h-16 ">
        <Link href={"/"} className={buttonVariants({ variant: "ghost" })} aria-label="Home page with prayer time rimender">
          <HomeIcon className={ active == '/' ? "text-emerald-500" : ''}/>
        </Link>
        {/* <Link href={"/qibla"} className={buttonVariants({ variant: "ghost" })} aria-label="Qibla page">
          <Compass className={active == '/qibla' ? "text-emerald-500" : ''}/>
        </Link> */}
        <Link href={"/quran"} className={buttonVariants({ variant: "ghost" })} aria-label="Quran page">
          <BookOpen className={active == '/quran' ? "text-emerald-500" : ''}/>
        </Link>
        <Link href={"/about"} className={buttonVariants({ variant: "ghost" })} aria-label="About page">
          <BadgeInfo className={active == '/about' ? "text-emerald-500" : ''} />
        </Link>
      </Card>
    </footer>
  );
};

export default BottomNavbar;
