import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageConent from "@/components/reading/PageContent";
import Summary from "@/components/reading/Summary";
import TakeAways from "./Takeaways";
import { Suspense } from "react";
import Loading from "../Loading";

export function Reading({ selectedCard, setIsReadingVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="z-50 absolute bg-slate-950 top-0 left-0 w-screen h-screen">
        <Button
          className="absolute top-4 right-4"
          onClick={() => setIsReadingVisible(false)}
        >
          Back
        </Button>
        <div className="bg-slate-950 z-10 flex flex-col justify-center items-center">
          <Suspense fallback={<Loading />}>
            <Summary />
          </Suspense>
          <PageConent pageText={selectedCard} />
          <TakeAways />
        </div>
      </div>
    </motion.div>
  );
}
