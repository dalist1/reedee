import { Skeleton } from "@/components/ui/skeleton"

export default function LibrarySkeleton() {
    return (
        <>
            {
                [...Array(3)].map((_, i) => (
                    <>
                        <Skeleton className="flex flex-col justify-evenly items-center h-96 w-96 bg-slate-900 rounded-3xl">
                            <Skeleton className="w-64 h-6 rounded-full bg-neutral-100" />
                            <Skeleton className="w-52 h-6 rounded-full bg-neutral-100" />
                            <Skeleton className="flex justify-center items-center w-72 h-44 rounded-3xl cursor-pointer bg-neutral-50" />
                        </Skeleton>
                    </>
                ))
            }
        </>
    )
}
