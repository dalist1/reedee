"use client";

import { useQuery } from "@tanstack/react-query";
import Interactions from "@/components/library/Interactions";
import Image from "next/image";
import { Reading } from "../reading/Reading";
import { useState } from "react";
import { fetchCardObjects } from "@/lib/fetchCardObjects";
import LibrarySkeleton from "./LibrarySkeleton";

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

  const { data, isLoading } = useQuery({
    queryKey: ["userFiles", category],
    queryFn: () => fetchCardObjects(category),
    notifyOnChangeProps: ['data']
  });

  if (isLoading) {
    return <LibrarySkeleton />
  }

  return (
    <>
      {data &&
        data.map((cardObject: cardObject, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-evenly items-center gap-y-4 h-[30rem] w-[22rem] bg-slate-900 rounded-3xl"
          >
            <h1 className="font-extrabold text-xl text-center max-h-12">{cardObject.title}</h1>
            <p className="font-medium">Author: {cardObject.author}</p>
            <div className="flex justify-center items-center w-72 h-44 mx-auto py-8 rounded-3xl cursor-pointer bg-black bg-[radial-gradient(#2a2a2b_1px,transparent_1px)] [background-size:16px_16px]"
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
    </>
  );
}