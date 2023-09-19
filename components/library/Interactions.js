import { FaShare, FaHeart, FaTrashCan } from "react-icons/fa6";

export default function Interactions() {
  return (
    <div className="flex justify-around items-center w-80 h-16 rounded-3xl">
      <span className="p-4 cursor-pointer bg-slate-950 rounded-full">
        <FaHeart />
      </span>
      <span className="p-4 cursor-pointer bg-slate-950 rounded-full">
        <FaShare />
      </span>
      <span className="p-4 cursor-pointer bg-slate-950 rounded-full">
        <FaTrashCan />
      </span>
    </div>
  );
}
