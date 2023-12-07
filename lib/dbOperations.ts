import { openDB, IDBPDatabase } from "idb";

let db: IDBPDatabase | null = null;

type CardObject = {
  file: File,
  name: string;
  thumbnail: string;
  author: string;
  title: string;
  pdf: Blob;
  liked?: boolean;
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

export async function saveToDatabase(cardObject: CardObject) {
  try {
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

export async function updateLikeStatus(fileName: string, liked: boolean) {
  try {
    const db = await getDatabase();
    const tx = db.transaction("pdfFiles", "readwrite");
    const store = tx.objectStore("pdfFiles");
    const cardObject = await store.get(fileName);
    if (cardObject) {
      cardObject.liked = liked;
      await store.put(cardObject);
    }
  } catch (error) {
    throw new Error("Error updating like status in database");
  }
}

export async function getBlobUrl(fileName: string): Promise<string> {
  const db = await getDatabase();
  const cardObject = await db.get("pdfFiles", fileName);
  if (cardObject && cardObject.pdf) {
    return URL.createObjectURL(cardObject.pdf);
  }
  throw new Error(`No file found for the name ${fileName}`);
}
