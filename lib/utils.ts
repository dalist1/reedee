import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function MockAPI() {
  const data = await fetch("/api/mock").then((response) => response.json().then((data)=> data.msg))
  return data
}