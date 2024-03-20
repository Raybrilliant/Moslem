'use client'
import React, { lazy, useState } from "react";
import { Button } from "./ui/button";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";

const PlayPauseButton = ({id} : {id:number}) => {
    const [status,setStatus] = useState(false);
    const [audio] = useState(new Audio (`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${id}.mp3`));
    
    
    if (status) {
       audio.play();
    } else {
       audio.pause();
    }
    

  return (
    <>
      <Button
        size={"icon"}
        variant={"outline"}
        className="rounded-full text-black dark:text-white"
        onClick={()=>setStatus(!status)}
      >
        {status == true ? <PauseCircleIcon/> : <PlayCircleIcon />}
      </Button>
    </>
  );
};

export default PlayPauseButton;
