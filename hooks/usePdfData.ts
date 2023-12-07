import { useSuspenseQuery } from "@tanstack/react-query";
import { extractTextFromPage } from "@/lib/pdfOperations";
import { getBlobUrl } from "@/lib/dbOperations";
import pdfjs from "@/lib/utils";
import { PdfData } from '@/types/pdf'

async function fetchPdfData(fileName: string, pageNumber: number) {
  try {
    const blobUrl = await getBlobUrl(fileName);
    const pdfDoc = await pdfjs.getDocument(blobUrl).promise;

    const numPages = pdfDoc.numPages;
    const currentPageText = await extractTextFromPage(pdfDoc, pageNumber);

    return { blobUrl, numPages, currentPageText };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type QueryResult = {
  data: PdfData;
}

export default function usePdfData(fileName: string, currentPage: number): QueryResult {
  const { data: pdfData } = useSuspenseQuery({
    queryKey: ['pdfData', currentPage],
    queryFn: () => fetchPdfData(fileName, currentPage),
  });

  return { data: pdfData };
}