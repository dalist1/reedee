"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaShare, FaTrashCan } from "react-icons/fa6";
import { removeAllFiles } from "@/lib/dbOperations";
import { useToast } from "@/components/ui/use-toast";
import InteractionsButton from "@/components/InteractionsButton";
import AnimatedLike from "../AnimatedLike";

export default function Interactions({fileName}) {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteFiles } = useMutation({
    mutationFn: async () => await removeAllFiles(),
    onSuccess: () => {
      toast({ description: "Files removed successfully!" });
      queryClient.invalidateQueries(["userFiles"]);
    },
    onError: () => {
      toast({ description: "There was an error, please try again." });
    },
  });

  return (
    <div className="flex justify-around items-center w-80 h-16 rounded-3xl">
      <InteractionsButton Icon={() => <AnimatedLike fileName={fileName} size={20} color="#ffffff" />} tooltipText="Like" />
      <InteractionsButton Icon={FaShare} tooltipText="Share" />
      <InteractionsButton
        Icon={FaTrashCan}
        tooltipText="Delete"
        onClick={() => deleteFiles()}
      />
    </div>
  );
}
