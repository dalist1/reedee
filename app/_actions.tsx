"use client";

import { pdfjs } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist/types/display/api";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import { openDB, deleteDB, IDBPDatabase } from "idb";

let db: IDBPDatabase | null = null;

type CardObject = {
  name: string;
  thumbnail: string;
  author: string;
  title: string;
  text: string;
};

async function extractTextFromPage(pdf: PDFDocumentProxy, pageNumber: number) {
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const strings = textContent.items.map((item) => item.str);
  return strings.join(" ");
}

async function getDatabase() {
  if (!db) {
    db = await openDB("ReedeeDB", 1, {
      upgrade(db) {
        db.createObjectStore("pdfFiles", { keyPath: "name" });
      },
    });
  }
  return db;
}

export async function saveToDatabase(
  file: File,
  thumbnail: string,
  authorName: string,
  title: string,
  text: string
) {
  try {
    const cardObject: CardObject = {
      name: file.name,
      thumbnail: thumbnail,
      author: authorName,
      title: title,
      text: text,
    };

    await db.put("pdfFiles", cardObject);
  } catch (error) {
    throw new Error("Error saving file to database");
  }
}

export async function removeFiles(fileName: string) {
  try {
    const db = await getDatabase();
    await db.delete("pdfFiles", fileName);
  } catch (error) {
    throw new Error("Error removing file from database");
  }
}

export async function removeAllFiles() {
  try {
    const db = await getDatabase();
    const tx = db.transaction("pdfFiles", "readwrite");
    await tx.objectStore("pdfFiles").clear();
  } catch (error) {
    throw new Error("Error removing all files from database");
  }
}

export async function getCardObjects(): Promise<CardObject[]> {
  const db = await getDatabase();
  const cardObjects = await db.getAll("pdfFiles");
  return cardObjects;
}

export async function processFile(file: File) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const blobURL = URL.createObjectURL(
        new Blob([reader.result as ArrayBuffer], { type: file.type })
      );

      const pdf = await pdfjs.getDocument(blobURL).promise;

      const metadata = await pdf.getMetadata();
      const authorName = metadata.info.Author as string;
      const title = metadata.info.Title as string;

      const text = await extractTextFromPage(pdf, 1);

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      const thumbnail = canvas.toDataURL();

      resolve({ file, thumbnail, authorName, title, text });
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

export const resetDatabase = async () => {
  try {
    await deleteDB("ReedeeDB");
    console.log("Database reset successful");
  } catch (error) {
    console.error("Error resetting database:", error);
  }
};
