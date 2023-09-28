import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageConent from "@/components/reading/PageContent";
import Summary from "@/components/reading/Summary";
import TakeAways from "./Takeaways";

export function Reading({ selectedCard, setIsReadingVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute bg-slate-950 top-0 left-0 w-full h-full">
        <Button
          className="absolute top-4 right-4"
          onClick={() => setIsReadingVisible(false)}
        >
          Back
        </Button>
        <div className="flex flex-col justify-center items-center">
          <Summary />
          <PageConent pageText={selectedCard} />
          <TakeAways />
        </div>
      </div>
    </motion.div>
  );
}
