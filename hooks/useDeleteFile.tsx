import { removeFile } from "@/lib/dbOperations";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeletefile() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { mutate: deleteFile } = useMutation({
        mutationFn: async (fileName: string) => await removeFile(fileName),
        onSuccess: () => {
            toast({ description: "Files removed successfully!" });
            queryClient.invalidateQueries(["userFiles"]);
        },
        onError: () => {
            toast({ description: "There was an error, please try again." });
        },
    });

    return deleteFile
}