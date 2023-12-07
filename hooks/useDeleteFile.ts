import { removeFile } from "@/lib/dbOperations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeletefile() {
    const queryClient = useQueryClient();
    const { mutate: deleteFile } = useMutation({
        mutationFn: async (fileName: string) => await removeFile(fileName),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["userFiles"]});
        }
    });
    return deleteFile
}