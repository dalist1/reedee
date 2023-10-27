"use client";

import { useQuery } from "@tanstack/react-query";
import Interactions from "./Interactions";
import Image from "next/image";
import { getCardObjects } from "@/lib/dbOperations";
import { Reading } from "../reading/Reading";
import { useState } from "react";

type cardObject = {
  name: string;
  author: string;
  title: string;
  thumbnail: string;
  pdf: string;
};

export default function Card({ category }) {
  const [isReadingVisible, setIsReadingVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const { data } = useQuery({
    queryKey: ["userFiles", category],
    queryFn: async ({ queryKey }) => {
      const data = await getCardObjects();
      const category = queryKey[1];
      if (category === "Liked") {
        return data.filter((cardObject) => cardObject.liked);
      }
      return data;
    },
    notifyOnChangeProps: ['data']
  });

  return (
    <main className="gap-y-12 grid lg:grid-cols-9 gap-x-8">
      {data &&
        data.map((cardObject: cardObject, index: number) => (
          <div
            key={index}
            className="col-span-6 md:col-span-3 bg-gray-800 space-y-8 p-6 rounded-3xl mx-auto"
          >
            <h1 className="font-extrabold text-2xl">{cardObject.title}</h1>
            <p>Author: {cardObject.author}</p>
            <div className="cursor-pointer aspect-video relative"
              onClick={() => {  
                setIsReadingVisible(true);
                setSelectedCard(cardObject);
              }}>
              <Image
                fill
                className="object-cover rounded"
                src={cardObject.thumbnail}
                alt={cardObject.title}

              />
            </div>
            <Interactions fileName={cardObject.name} />
          </div>
        ))}

      {isReadingVisible && (
        <Reading
          fileName={selectedCard.name}
          selectedCard={selectedCard}
          setIsReadingVisible={setIsReadingVisible}
        />
      )}
    </main>
  );
}
