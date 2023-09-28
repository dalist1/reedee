"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaShare, FaHeart, FaTrashCan } from "react-icons/fa6";
import { removeAllFiles } from "@/app/_actions";
import { useToast } from "@/components/ui/use-toast";
import InteractionsButton from "@/components/InteractionsButton";

export default function Interactions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteFiles, isLoading: deleteLoading } = useMutation({
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
      <InteractionsButton Icon={FaHeart} tooltipText="Like" />
      <InteractionsButton Icon={FaShare} tooltipText="Share" />
      <InteractionsButton
        Icon={FaTrashCan}
        tooltipText="Delete"
        onClick={() => deleteFiles()}
      />
    </div>
  );
}
