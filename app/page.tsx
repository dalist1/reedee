"use client";

import React from "react";
import DropZone from "./DropZone";
import Library from "@/components/library/Library";
import { getCardObjects } from "@/lib/dbOperations";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["userFiles"],
    queryFn: async () => {
      const data = await getCardObjects();
      return data;
    }
  });

  return (
    <>{isLoading ? null : data.length === 0 ? <DropZone /> : <Library />}</>
  );
}
