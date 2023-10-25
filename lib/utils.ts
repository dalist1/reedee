import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import { useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function MockAPI() {
  const data = await fetch("/api/mock").then((response) => response.json().then((data)=> data.msg))
  return data
}