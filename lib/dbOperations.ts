import { openDB, IDBPDatabase } from "idb";

let db: IDBPDatabase | null = null;

type CardObject = {
  name: string;
  thumbnail: string;
  author: string;
  title: string;
  pdf: string;
};

export async function getDatabase() {
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
  pdf: string
) {
  try {
    const cardObject: CardObject = {
      name: file.name,
      thumbnail: thumbnail,
      author: authorName,
      title: title,
      pdf: pdf,
    };

    console.log("Saving PDF ArrayBuffer to database:", pdf);

    await db.put("pdfFiles", cardObject);
  } catch (error) {
    throw new Error("Error saving file to database");
  }
}

export async function removeFile(fileName: string) {
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
