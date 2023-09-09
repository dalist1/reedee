import { FaCloudUploadAlt } from "react-icons/fa";

export default function HomePage() {
  return (
    <>
      <div className="flex h-full w-full justify-center items-center">
        <div className="text-center bg-gray-400 w-11/12 h-2/5 cursor-pointer flex rounded-3xl space-y-12 font-bold flex-col items-center justify-center text-white bg-opacity-20 drop-shadow-lg hover:backdrop-blur-lg backdrop-blur-md hover:shadow-lg hover:shadow-black">
          <FaCloudUploadAlt size={90} />
          <div className="flex space-x-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600">
              Drag & drop
            </span>
            <span>or</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
              click
            </span>
            <span>to upload.</span>
          </div>
        </div>
      </div>
    </>
  );
}
