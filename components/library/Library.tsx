import CallToAction from "@/components/library/UploadButton";
import Card from "@/components/library/Card";
import Categories from "./Categories";
import { useState } from "react";

export default function Library() {
  const [category, setCategory] = useState("All");

  return (
    <div className="flex flex-col items-center sm:max-lg:items-center gap-y-12 max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full">
      <div className="flex justify-between items-end gap-x-10 w-11/12">
        <Categories category={category} setCategory={setCategory} />
        <CallToAction />
      </div>
      <Card category={category} />
    </div>
  );
}