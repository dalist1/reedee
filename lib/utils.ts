import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function extractTextFromPage(pdf: PDFDocumentProxy, pageNumber: number) {
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const strings = textContent.items.map((item) => item.str);
  return strings.join(" ");
}