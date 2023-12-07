import { PdfData } from "@/types/pdf";

export type Navigation = {
    currentPage: number;
    goToNextPage: (numPages: number) => void;
    goToPreviousPage: (numPages: number) => void;
    setCurrentPage: (page: number) => void;
    pdfData?: PdfData; 
   };