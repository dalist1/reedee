// PageContent file containing the text from the PDF

import { AiOutlineExpandAlt } from "react-icons/ai";

export default function PageConent({ pageText }) {
  console.log("This is the currentPageText",pageText)
  return (
    <div className="sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full p-6">
      <div className="flex flex-col col-span-6 md:col-span-3 bg-gray-800 p-6 rounded-3xl justify-end relative">
        <div className="flex justify-end">
          <AiOutlineExpandAlt
            className="cursor-pointer p-2 right-0 hover:bg-white/40 rounded-xl mb-4"
            size={40}
          />
        </div>
        <span>{pageText}</span>
      </div>
    </div>
  );
}
