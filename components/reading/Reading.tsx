import { motion } from 'framer-motion';
import PageContent from '@/components/reading/PageContent';
import Summary from '@/components/reading/Summary';
import TakeAways from '@/components/reading/Takeaways';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import Controls from '@/components/reading/Controls';
import usePdfData from '@/hooks/usePdfData';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { ReadingProps } from '@/types/reading';
import { useSummaryStore } from '@/stores/useSummaryStore';
import { useTakeawaysStore } from '@/stores/useTakeawaysStore';
import { FaChevronLeft } from 'react-icons/fa6';
import usePlayAudio from '@/hooks/usePlayAudio';

export function Reading({ setIsReadingVisible, fileName }: ReadingProps) {
  const takeaways = useTakeawaysStore((st) => st.isTakeawaysEnabled);
  const summary = useSummaryStore((st) => st.isSummaryEnabled);


  const { currentPage } = useNavigationStore();
  const { data: pdfData } = usePdfData(fileName, currentPage);

  // Cleanup on back button

  const { cleanup } = usePlayAudio(pdfData.currentPageText)


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="absolute left-0 top-0 z-50 h-screen w-screen overflow-y-scroll bg-slate-950">

        <button
          className="absolute right-6 top-6 flex items-center justify-center gap-x-4 rounded-2xl bg-slate-800 p-3"
          onClick={() => {
            cleanup()
            setIsReadingVisible(false);
          }}
        >
          <FaChevronLeft />
          <span>Back</span>
        </button>



        <div className="z-10 my-20 flex flex-col items-center justify-center gap-y-10 p-6">
          {summary && (
            <div className="mx-auto h-full w-full max-w-6xl items-start sm:flex-col sm:max-lg:grid-cols-6 sm:max-lg:items-center">
              <div className="col-span-6 space-y-8 rounded-3xl bg-blue-500 bg-opacity-10 p-6 text-blue-500 md:col-span-3">
                <Suspense fallback={<Loading name="summary" color="sky" />}>
                  <Summary />
                </Suspense>
              </div>
            </div>
          )}

          <Suspense fallback={<Loading name="page content." color="blue" />}>
            <PageContent pageText={pdfData.currentPageText} currentPage={currentPage} numPages={pdfData.numPages} />
          </Suspense>

          {takeaways && (
            <div className="mx-auto h-full w-full max-w-6xl items-start sm:flex-col sm:max-lg:grid-cols-6 sm:max-lg:items-center">
              <div className="col-span-6 space-y-8 rounded-3xl bg-purple-500 bg-opacity-10 p-6 text-purple-500 md:col-span-3">
                <Suspense fallback={<Loading name="takeaways" color="violet" />}>
                  <TakeAways />
                </Suspense>
              </div>
            </div>
          )}

          <Controls
            fileName={fileName}
            numPages={pdfData.numPages}
            currentPageText={pdfData.currentPageText}
            currentPage={currentPage}
          />
        </div>
        <div className="pointer-events-none fixed bottom-0 left-0 z-0 h-14 w-full bg-black to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-black"></div>
      </div>
    </motion.div >
  );
}
