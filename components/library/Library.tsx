import CallToAction from "@/components/library/UploadButton";
import Card from "@/components/library/Card";
import Categories from "./Categories";
import { useState } from "react";

export default function Library() {
  const [category, setCategory] = useState("All");

  return (
    <main className="text-white py-10 overflow-y-scroll h-screen w-screen bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="flex flex-col justify-center overflow-y-scroll items-center gap-y-10 lg:max-w-full sm:max-w-md mx-auto">
        <div className="flex items-center justify-between gap-x-10">
          <Categories category={category} setCategory={setCategory} />
          <CallToAction />
        </div>
        <section className="flex flex-col flex-wrap lg:flex-row gap-10 justify-center items-center h-full w-full overflow-hidden max-w-7xl">
          <Card category={category} />
        </section>
      </div>
    </main >
  );
}