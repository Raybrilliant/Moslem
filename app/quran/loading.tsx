import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <Skeleton className=" h-[10em] w-[100%} my-5" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
        <Skeleton className=" h-[5em] w-[100%}" />
      </div>
    </>
  );
};

export default Loading;
