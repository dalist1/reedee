"use client";

import { FaShare, FaTrashCan } from "react-icons/fa6";
import InteractionsButton from "@/components/InteractionsButton";
import AnimatedLike from "../AnimatedLike";
import useDeletefile from "@/hooks/useDeleteFile";

export default function Interactions({ fileName }) {

  const deleteFile = useDeletefile()

  return (
    <div className="flex justify-around items-center w-80 h-16 rounded-3xl">
      <InteractionsButton Icon={() => <AnimatedLike fileName={fileName} size={20} color="#ffffff" />} tooltipText="Like" />
      <InteractionsButton Icon={FaShare} tooltipText="Share" />
      <InteractionsButton
        Icon={FaTrashCan}
        tooltipText="Delete"
        onClick={() => deleteFile(fileName)}
      />
    </div>
  );
}
