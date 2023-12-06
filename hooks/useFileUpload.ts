import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveToDatabase } from "@/lib/dbOperations";
import { useToast } from "@/components/ui/use-toast";
import { processFile } from "@/lib/pdfOperations";

export default function useFileUpload() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: uploadFiles } = useMutation({
    mutationFn: async (file: File) => {
      const processedData = await processFile(file);
      await saveToDatabase({
        file: processedData.file,
        thumbnail: processedData.thumbnail,
        authorName: processedData.authorName,
        title: processedData.title,
        pdf: processedData.pdf
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["userFiles"]});
    },
    onError: () => {
      toast({ description: "Error uploading files." });
    },
   });

  return uploadFiles;
}