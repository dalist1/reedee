import DropZone from "@/components/DropZone";
import ArrowSVG from '@/public/arrow.svg'
import Image from 'next/image'

export default function HomeScreen() {
    return (
        <section className="flex flex-col justify-center gap-y-3 items-center bg-black bg-[url('..//public/Looper.svg')] h-full mx-auto">
            <div className="flex flex-col justify-center items-center w-full gap-y-4">
                <span className="text-slate-400 translate-x-6 rotate-12 font-hand text-2xl pl-16">Upload your PDF</span>
                <Image className="pl-8 pb-3" src={ArrowSVG} alt="arrow" width={120} height={120} />
            </div>
            <DropZone />
        </section >
    )
}