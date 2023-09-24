"use client";

import { openDB, deleteDB, IDBPDatabase } from "idb";

let db: IDBPDatabase | null = null;

type CardObject = {
  name: string;
  blob: Blob;
  thumbnail: string;
  author: string;
  title: string;
};

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
  title: string
) {
  try {
    const db = await getDatabase();
    const blob = new Blob([file], { type: file.type });

    const cardObject: CardObject = {
      name: file.name,
      blob,
      thumbnail: thumbnail,
      author: authorName,
      title: title,
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

export async function getBlob(fileName: string): Promise<Blob> {
  try {
    const db = await getDatabase();
    const fileData = await db.get("pdfFiles", fileName);

    if (fileData && fileData.blob) {
      return fileData.blob;
    } else {
      throw new Error("Blob not found in database");
    }
  } catch (error) {
    throw new Error("Error retrieving blob from database");
  }
}

export const resetDatabase = async () => {
  try {
    await deleteDB("ReedeeDB");
    console.log("Database reset successful");
  } catch (error) {
    console.error("Error resetting database:", error);
  }
};
