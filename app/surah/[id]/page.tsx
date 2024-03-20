import BackButton from "@/components/BackButton";
import SurahPage from "@/components/SurahPage";
import getSurah from "@/server/getSurah";
import { Suspense } from "react";
import Loading from "./loading";

export const runtime = 'edge'
const Surah = async ({ params }: { params: { id: string } }) => {
  const surah = await getSurah(params.id);
  return (
    <div className="container py-5 min-h-screen">
      <Suspense fallback={<Loading />}>
        <SurahPage surah={surah.data}/>
      </Suspense>
    </div>
  );
};

export default Surah;
