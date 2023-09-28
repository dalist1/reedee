"use client";

import { useQuery } from "@tanstack/react-query";
import Interactions from "./Interactions";
import Image from "next/image";
import { getCardObjects } from "@/app/_actions";
import Loading from "@/components/Loading";
import { Reading } from "../reading/Reading";
import { useState } from "react";

type cardObject = {
  name: string;
  author: string;
  title: string;
  thumbnail: string;
  text: string;
};

export default function Card() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userFiles"],
    queryFn: async () => {
      const data = await getCardObjects();
      console.log(data);
      return data;
    },
  });

  const [isReadingVisible, setIsReadingVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  if (isLoading) return <Loading />;
  if (isError) return `An error has occurred:`;

  return (
    <main className="gap-y-12 grid lg:grid-cols-9 gap-x-8">
      {data &&
        data.map((cardObject: cardObject, index: number) => (
          <div
            key={index}
            className="cursor-pointer col-span-6 md:col-span-3 bg-gray-800 space-y-8 p-6 rounded-3xl mx-auto"
            onClick={() => {
              setIsReadingVisible(true);
              setSelectedCard(cardObject);  
            }}
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
      {isReadingVisible && (
        <Reading
          selectedCard={selectedCard}
          setIsReadingVisible={setIsReadingVisible}
        />
      )}
    </main>
  );
}
