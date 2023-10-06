import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveToDatabase } from "@/app/_actions";

type UploadFileParams = {
  file: File;
  thumbnail: string;
  authorName: string;
  title: string;
  pdf: string;
};

export default function useFileUpload() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: uploadFiles } = useMutation({
    mutationFn: async (params: UploadFileParams) =>
    await saveToDatabase(params.file, params.thumbnail, params.authorName, params.title, params.pdf),    
    onSuccess: () => {
      queryClient.invalidateQueries(["userFiles"]);
    },
    onError: () => {
      toast({ description: "Error uploading files." });
    },
  });

    return uploadFiles;
}