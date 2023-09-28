// Sidebar

import { AiOutlineClose } from "react-icons/ai";

export default function dalist() {
  return (
    <div className="flex h-full items-center">
      <div className="flex flex-col bg-slate-800 p-4 h-52 justify-center items-cente rounded-3xl">
        <span className="p-4 ">
          <AiOutlineClose />
        </span>
        <span className="p-4">
          <AiOutlineClose />
        </span>
        <span className="p-4">
          <AiOutlineClose />
        </span>
        <span className="p-4">
          <AiOutlineClose />
        </span>
      </div>
    </div>
  );
}
