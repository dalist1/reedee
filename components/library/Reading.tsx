import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function Reading({ selectedCard, setIsReadingVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute bg-red-500 top-0 left-0 w-full h-full justify-center items-center flex flex-col">
        <h1>{selectedCard.text}</h1>
        <Button onClick={() => setIsReadingVisible(false)}>Back</Button>
      </div>
    </motion.div>
  );
}
