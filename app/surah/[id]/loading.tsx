import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
  return (
    <>
     <div className="flex flex-col space-y-3">
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-5 w-[100%]"/>
        <Skeleton className="h-5 w-[80%]"/>
    </div>
    <div className="flex flex-col space-y-3 my-4">
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-5 w-[100%]"/>
        <Skeleton className="h-5 w-[80%]"/>
    </div>
    <div className="flex flex-col space-y-3 my-4">
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-5 w-[100%]"/>
        <Skeleton className="h-5 w-[80%]"/>
    </div>
    <div className="flex flex-col space-y-3 my-4">
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-5 w-[100%]"/>
        <Skeleton className="h-5 w-[80%]"/>
    </div>
    </>
   
  )
}

export default Loading