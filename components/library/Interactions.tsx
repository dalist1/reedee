"use client";

import { FaShare, FaTrashCan } from "react-icons/fa6";
import InteractionsButton from "@/components/reading/InteractionsButton";
import AnimatedLike from "../reading/AnimatedLike";
import useDeletefile from "@/hooks/useDeleteFile";
import { getDatabase } from "@/lib/dbOperations";

export default function Interactions({ fileName }) {
  const deleteFile = useDeletefile();

  const handleShare = async () => {
    const db = await getDatabase();
    const cardObject = await db.get("pdfFiles", fileName);
  
    if (cardObject && cardObject.pdf) {
      const file = new File([cardObject.pdf], fileName, { type: "application/pdf" });
      const fileSizeInMB = file.size / (1024 * 1024);
  
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          text: `Size: ${fileSizeInMB.toFixed(2)} MB.`,
          files: [file],
        })
        .catch((error) => console.log('Error sharing', error));
      } else {
        console.log(`Your system doesn't support sharing files.`);
      }
    }
  };  

  return (
    <div className="flex justify-around items-center w-80 h-16 rounded-3xl pt-10">
      <InteractionsButton Icon={() => <AnimatedLike fileName={fileName} size={20} color="#ffffff" />} tooltipText="Like" />
      <InteractionsButton Icon={FaShare} tooltipText="Share" onClick={handleShare} />
      <InteractionsButton
        Icon={FaTrashCan}
        tooltipText="Delete"
        onClick={() => deleteFile(fileName)}
      />
    </div>
  );
}

