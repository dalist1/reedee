"use client";

// import { getGames } from "../../lib/utils";
import Interactions from "./Interactions";
import Image from "next/image";
import { getCardObjects } from "@/app/_actions";
import { useState, useEffect } from "react";

export default function Card() {
  const [cardObjects, setCardObjects] = useState([]);

  useEffect(() => {
    const fetchCardObjects = async () => {
      const cardObjects = await getCardObjects();
      setCardObjects(cardObjects);
    };

    fetchCardObjects();
  }, []);

  console.log(cardObjects);
  return (
    <main className="gap-y-12 grid lg:grid-cols-9 gap-x-8">
      {cardObjects.map((cardObject) => (
        <div
          key={cardObject.name}
          className="col-span-6 md:col-span-3 bg-gray-800 space-y-8 p-6 rounded-3xl"
        >
          <h1 className="font-extrabold text-2xl">{cardObject.title}</h1>
          <p>Author: {cardObject.author}</p>
          <div className="aspect-video relative">
            <Image
              fill
              className="object-cover rounded"
              src={cardObject.thumbnail}
              alt={cardObject.title}
            />
          </div>
          <Interactions />
        </div>
      ))}
    </main>
  );
}
