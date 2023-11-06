"use client";

import { useQuery } from "@tanstack/react-query";
import Interactions from "@/components/library/Interactions";
import Image from "next/image";
import { getCardObjects } from "@/lib/dbOperations";
import { Reading } from "../reading/Reading";
import { useState } from "react";

type cardObject = {
  name: string;
  author: string;
  title: string;
  thumbnail: string;
  pdf: Blob;
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
    <main className="text-white w-11/12 gap-7 grid lg:grid-cols-12">
      {data &&
        data.map((cardObject: cardObject, index: number) => (
          <div
            key={index}
            className="grid grid-rows-2 gap-y-5 justify-items-center place-content-center sm:col-span-9 items-center p-12 text-center lg:col-span-4 rounded-3xl bg-slate-900"
          >
            <h1 className="font-extrabold text-xl">{cardObject.title}</h1>
            <p>Author: {cardObject.author}</p>
            <div className="flex justify-center items-center w-11/12 mx-auto py-6 rounded-3xl cursor-pointer bg-black bg-[radial-gradient(#2a2a2b_1px,transparent_1px)] [background-size:16px_16px]"
              onClick={() => {
                setIsReadingVisible(true);
                setSelectedCard(cardObject);
              }}>
              <Image
                src={cardObject.thumbnail}
                className="rounded"
                alt={cardObject.title}
                width={100}
                height={100}
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