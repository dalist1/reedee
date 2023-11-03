import { useQuery } from "@tanstack/react-query";
import { extractTextFromPage } from "@/lib/pdfOperations";
import { getBlobUrl } from "@/lib/dbOperations";
import * as pdfjs from 'pdfjs-dist';

type PdfData = {
  blobUrl: string,
  numPages: number,
  currentPageText: string
}

async function fetchPdfData(fileName: string) {
  try {
    const blobUrl = await getBlobUrl(fileName);
    const pdfDoc = await pdfjs.getDocument(blobUrl).promise;

    const numPages = pdfDoc.numPages;
    const currentPageText = await extractTextFromPage(pdfDoc, 1);

    return { blobUrl, numPages, currentPageText };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type QueryResult = {
  data: PdfData,
  isLoading: boolean,
  isError: boolean,
  error: Error
}

export default function usePdfData(fileName: string): QueryResult {
  const { data: pdfData, isLoading, isError, error } = useQuery({
    queryKey: ['pdfData'],
    queryFn: () => fetchPdfData(fileName)
  });

  return { data: pdfData, isLoading, isError, error };
}