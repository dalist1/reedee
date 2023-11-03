import * as pdfjs from 'pdfjs-dist';

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

const createBlobUrl = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const blobURL = URL.createObjectURL(
          new Blob([reader.result as ArrayBuffer], { type: file.type })
        );
        resolve(blobURL);
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
    const blobURL = await createBlobUrl(file);
    const { pdf, metadata } = await getMetadata(blobURL);
    const thumbnail = await renderThumbnail(pdf);
    
    return {
      file,
      thumbnail,
      authorName: metadata.info.Author as string,
      title: metadata.info.Title as string,
      pdf: blobURL,
    };
  }

  