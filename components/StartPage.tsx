import DropZone from "@/app/DropZone";

export default function StartPage() {
    return (
        <section className="flex justify-center items-center bg-[url('..//public/Looper.svg')] h-full mx-auto">
            <DropZone />
        </section>
    )
}