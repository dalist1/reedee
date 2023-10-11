// Reading component with the page navigation
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageContent from "@/components/reading/PageContent";
import Summary from "@/components/reading/Summary";
import TakeAways from "./Takeaways";
import { Suspense } from "react";
import Loading from "../Loading";
import { extractTextFromPage } from "@/lib/pdfOperations";
import Controls from "@/components/Controls"

import * as pdfjs from 'pdfjs-dist';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export function Reading({ selectedCard, setIsReadingVisible }) {
  console.log("Selected card object", selectedCard);
  const { pdf: blobUrl } = selectedCard;
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [currentPageText, setCurrentPageText] = useState(null);

  useEffect(() => {
    if (blobUrl) {
      const loadNumPages = async () => {
        const pdfDoc = await pdfjs.getDocument(blobUrl).promise;
        setNumPages(pdfDoc.numPages);
      };
      loadNumPages();
    }
  }, [blobUrl]);

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadPage = async () => {
    const pdfDoc = await pdfjs.getDocument(blobUrl).promise;
    const text = await extractTextFromPage(pdfDoc, currentPage);
    setCurrentPageText(text);
  };

  useEffect(() => {
    loadPage();
  }, [currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="z-50 absolute bg-black/60 top-0 left-0 w-full h-full">
        <Button
          className="absolute top-4 right-4"
          onClick={() => setIsReadingVisible(false)}
        >
          Back
        </Button>
        <div className="bg-slate-950 z-10 flex flex-col justify-center items-center pb-20">
          <div className="w-full sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full p-6 mt-14">
            <div className="text-blue-500 col-span-6 md:col-span-3 bg-blue-500 bg-opacity-10 space-y-8 p-6 rounded-3xl">
              <Suspense fallback={<Loading name="summary" />}>
                <Summary />
              </Suspense>
            </div>
          </div>
          <PageContent pageText={currentPageText} />
          <TakeAways />
          <Controls currentPageText={currentPageText} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage}/>
        </div>
        <div className="pointer-events-none fixed left-0 bottom-0 z-0 h-14 w-full bg-black to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-black"></div>
      </div>
    </motion.div>
  );
}
