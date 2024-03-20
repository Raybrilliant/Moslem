"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ButtonAnimate from "./animation/ButtonAnimate";

const BackButton = () => {
  const router = useRouter()
  return (
    <ButtonAnimate>
      <Button
        variant={"outline"}
        size={"icon"}
        className="mb-5"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </Button>
    </ButtonAnimate>
  );
};

export default BackButton;
