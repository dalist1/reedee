import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function MockAPI() {
  const data = await fetch("/api/mock").then((response) => response.json().then((data) => data.msg))
  return data
}

export function splitTextIntoBionicComponents(text: string) {
  return text.split(' ').map((word, i) => {
    if (word.length > 3) {
      const firstThreeLetters = word.slice(0, 3);
      const restOfWord = word.slice(3);
      return (
        <Fragment key={i}>
          <span className="font-bold underline">{firstThreeLetters}</span>
          {restOfWord + ' '}
        </Fragment>
      );
    }
    return word + ' ';
  });
}