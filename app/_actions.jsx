"use client"

import { openDB } from "idb";

let db;

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

export async function saveToDatabase(file, thumbnail, authorName, title) {
  try {
    const db = await openDB("myDatabase", 1, {
      upgrade(db) {
        db.createObjectStore("pdfFiles", { keyPath: "name" });
      },
    });

    // Create an object that includes the file and the thumbnail
    const cardObject = {
      name: file.name,
      file: file,
      thumbnail: thumbnail,
      author: authorName,
      title: title,
    };

    await db.put("pdfFiles", cardObject);
  } catch (error) {
    throw new Error("Error saving file to database");
  }
}

export async function removeFiles(fileName) {
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

export async function getCardObjects() {
  const db = await openDB("myDatabase", 1);
  const cardObjects = await db.getAll("pdfFiles");
  return cardObjects;
}
