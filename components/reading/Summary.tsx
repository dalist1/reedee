import { MockAPI } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "../Loading";

export default async function Summary() {
  const res = await MockAPI();
  return (
    <div className="w-full sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full p-6 mt-14">
      <div className="text-blue-500 col-span-6 md:col-span-3 bg-blue-500 bg-opacity-10 space-y-8 p-6 rounded-3xl">
        {res}
      </div>
    </div>
  );
}
