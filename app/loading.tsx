import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div>
        <Skeleton className="h-[8em] w-[100%] rounded-lg"/>
        <div className="flex flex-col space-y-3 my-5">
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-10 w-[100%]"/>
        <Skeleton className="h-10 w-[100%]"/>
        </div>
    </div>
  )
}

export default Loading