import pdfjs from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function extractTextFromPage(
  pdf: pdfjs.PDFDocumentProxy,
  pageNumber: number
) {
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const strings = textContent.items.map((item) => item.str);
  return strings.join(" ");
}

const createBlob = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
      resolve(blob);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};
  
  const getMetadata = async (blobURL: string) => {
    const pdf = await pdfjs.getDocument(blobURL).promise;
    const metadata = await pdf.getMetadata();
    return { pdf, metadata };
  };
  
  const renderThumbnail = async (pdf) => {
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport }).promise;
    return canvas.toDataURL();
  };
  
  export async function processFile(file: File) {
    const blob = await createBlob(file);
    const blobURL = URL.createObjectURL(blob);
    const { pdf, metadata } = await getMetadata(blobURL);
    const thumbnail = await renderThumbnail(pdf);
    
    return {
      file,
      thumbnail,
      authorName: metadata.info.Author,
      title: metadata.info.Title,
      pdf: blob,
    };
  }

  