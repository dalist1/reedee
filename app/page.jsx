import DropZone from "./DropZone";

export default function HomePage() {
  return (
    <>
      <div className="flex h-full w-full justify-center items-center max-w-md mx-auto">
        <div className="text-center bg-gray-400 w-11/12 h-2/5 cursor-pointer flex rounded-3xl space-y-12 font-bold flex-col items-center justify-center text-white bg-opacity-20 drop-shadow-lg border border-[#FF1CF7] hover:backdrop-blur-lg backdrop-blur-md shadow-custom">
          <DropZone className="flex flex-col gap-y-10 justify-center items-center w-full h-full" />
        </div>
      </div>
    </>
  );
}
