import DropZone from "@/components/DropZone";

export default function HomeScreen() {
    return (
        <section className="flex justify-center items-center bg-black bg-[url('..//public/Looper.svg')] h-full mx-auto">
            <DropZone />
        </section>
    )
}