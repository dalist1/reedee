import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveToDatabase } from "@/app/_actions";
import { useToast } from "@/components/ui/use-toast";
import { processFile } from "@/app/_actions"; // Import the processFile function

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
    mutationFn: async (file: File) => {
      const processedData = await processFile(file);
      await saveToDatabase(processedData.file, processedData.thumbnail, processedData.authorName, processedData.title, processedData.pdf);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userFiles"]);
    },
    onError: () => {
      toast({ description: "Error uploading files." });
    },
  });

  return uploadFiles;
}
