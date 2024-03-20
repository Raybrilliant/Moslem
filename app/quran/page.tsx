import SearchQuran from "@/components/SearchQuran";
import getQuran from "@/server/getQuran";
import { Suspense } from "react";
import Loading from "./loading";
import BottomNavbar from "@/components/BottomNavbar";

export const runtime = 'edge'
const Quran = async () => {
  const qurans = await getQuran();

  return (
    <>
      <div className="container py-5 min-h-screen">
        <Suspense fallback={<Loading />}>
          <div className="mb-16 standalone:mt-10">
            <SearchQuran surah={qurans.data} />
          </div>
        </Suspense>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Quran;
