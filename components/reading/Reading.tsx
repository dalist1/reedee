import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageContent from "@/components/reading/PageContent";
import Summary from "@/components/reading/Summary";
import TakeAways from "@/components/reading/Takeaways";
import { Suspense } from "react";
import Loading from "../Loading";
import Controls from "@/components/reading/Controls"
import usePdfData from "@/hooks/usePdfData";
import { useNavigationStore } from "@/stores/useNavigationStore";
import { ReadingProps } from "@/types/reading";
import { useSummaryStore } from "@/stores/useSummaryStore";
import { useTakeawaysStore } from "@/stores/useTakeawaysStore";

// pdfjs Worker
import pdfjs from "@/lib/utils";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function Reading({ setIsReadingVisible, fileName }: ReadingProps) {
  const takeaways = useTakeawaysStore((st) => st.isTakeawaysEnabled)
  const summary = useSummaryStore((st) => st.isSummaryEnabled)

  const { currentPage, goToNextPage, goToPreviousPage } = useNavigationStore();
  const { data: pdfData } = usePdfData(fileName, currentPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="z-50 absolute overflow-y-scroll bg-slate-950 top-0 left-0 w-screen h-screen">
        <Button className="absolute top-4 right-4" onClick={() => setIsReadingVisible(false)}>
          Back
        </Button>
        <div className="z-10 flex flex-col justify-center items-center gap-y-10 my-20 p-6">

          {summary &&
            <div className="w-full sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full">
              <div className="text-blue-500 col-span-6 md:col-span-3 bg-blue-500 bg-opacity-10 space-y-8 p-6 rounded-3xl">
                <Suspense fallback={<Loading name="summary" color="sky" />}>
                  <Summary />
                </Suspense>
              </div>
            </div>
          }

          <Suspense>
            <PageContent pageText={pdfData.currentPageText} />
          </Suspense>

          {takeaways &&
            <div className="w-full sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full">
              <div className="text-purple-500 col-span-6 md:col-span-3 bg-purple-500 bg-opacity-10 space-y-8 p-6 rounded-3xl">
                <Suspense fallback={<Loading name="takeaways" color="violet" />}>
                  < TakeAways />
                </Suspense>
              </div>
            </div>
          }

          <Controls fileName={fileName} currentPageText={pdfData.currentPageText} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} />
        </div>
        <div className="pointer-events-none fixed left-0 bottom-0 z-0 h-14 w-full bg-black to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-black"></div>
      </div>
    </motion.div >
  );
}