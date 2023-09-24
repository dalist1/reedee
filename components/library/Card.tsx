"use client";

import { useQuery } from "@tanstack/react-query";
import Interactions from "./Interactions";
import Image from "next/image";
import { getCardObjects } from "@/app/_actions";
import Loading from "@/components/Loading";

type cardObject = {
  name: string;
  author: string;
  title: string;
  thumbnail: string;
};

export default function Card() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userFiles'],
    queryFn: async () => {
      const data = await getCardObjects();
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return `An error has occurred:`;

  return (
    <main className="gap-y-12 grid lg:grid-cols-9 gap-x-8">
      {data &&
        data.map((cardObject: cardObject) => (
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
