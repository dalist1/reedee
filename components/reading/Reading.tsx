import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageContent from "@/components/reading/PageContent";
import Summary from "@/components/reading/Summary";
import TakeAways from "@/components/reading/Takeaways";
import { Suspense } from "react";
import Loading from "../Loading";
import Controls from "@/components/reading/Controls"
import usePdfData from "@/hooks/usePdfData";
import { Dispatch, SetStateAction } from "react";


import * as pdfjs from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PdfData = {
  currentPageText: string;
  numPages: number;
};

type ReadingProps = {
  fileName: string;
  selectedCard: ""
  setIsReadingVisible: Dispatch<SetStateAction<boolean>>;
};

export function Reading({ setIsReadingVisible, fileName }: ReadingProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: pdfData } = usePdfData(fileName, currentPage);

  const goToNextPage = () => {
    if (currentPage < pdfData.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="z-50 absolute overflow-y-scroll bg-slate-950 top-0 left-0 w-screen h-screen">
        <Button
          className="absolute top-4 right-4"
          onClick={() => setIsReadingVisible(false)}
        >
          Back
        </Button>
        <div className="z-10 flex flex-col justify-center items-center pb-20">
          <div className="w-full sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full p-6 mt-14">
            <div className="text-blue-500 col-span-6 md:col-span-3 bg-blue-500 bg-opacity-10 space-y-8 p-6 rounded-3xl">
              {/* <Suspense fallback={<Loading name="summary" />}>
                <Summary />
              </Suspense> */}
            </div>
          </div>

          <Suspense fallback={<Loading name="pageContent" />}>
            <PageContent pageText={pdfData.currentPageText} />
          </Suspense>

          {/* <TakeAways /> */}
          <Controls fileName={fileName} currentPageText={pdfData.currentPageText} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} />        </div>
        <div className="pointer-events-none fixed left-0 bottom-0 z-0 h-14 w-full bg-black to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-black"></div>
      </div>
    </motion.div>
  );
}