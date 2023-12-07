import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveToDatabase } from '@/lib/dbOperations';
import { processFile } from '@/lib/pdfOperations';
import { CardObject } from '@/types/card';

export default function useFileUpload() {
  const queryClient = useQueryClient();
  
  const { mutate: uploadFiles } = useMutation({
    mutationFn: async (file: File) => {
      const processedData = await processFile(file);
      const cardObject: CardObject = {
        file: processedData.file,
        name: processedData.file.name,
        thumbnail: processedData.thumbnail,
        author: processedData.author,
        title: processedData.title,
        pdf: processedData.pdf,
      };
      await saveToDatabase(cardObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFiles'] });
    },
  });

  return uploadFiles;
}
