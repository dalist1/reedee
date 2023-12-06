import { PdfData } from "@/types/pdf";

export type Navigation = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    pdfData?: PdfData; 
   };