"use client"

import React, { Suspense } from "react";
import DropZone from "./DropZone";
import Library from "@/components/library/Library";
import { getCardObjects } from "./_actions";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userFiles"],
    queryFn: async () => {
      const data = await getCardObjects();
      return data;
    },
  });

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {isLoading ? null : data.length === 0 ? <DropZone /> : <Library />}
      </Suspense>
    </>
  );
}