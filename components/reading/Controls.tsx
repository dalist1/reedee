"use client"

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { TbArrowBackUp, TbArrowForwardUp } from 'react-icons/tb';
import { FaGear } from 'react-icons/fa6';
import AnimatedLike from '@/components/reading/AnimatedLike';
import StyledDropdownMenu from '@/components/settings/SettingsModal';
import Ripple from '@/components/ui/ripple';
import { useRipple } from '@/components/ui/use-ripple';
import Loading from '@/components/Loading';
import { useNavigationStore } from '@/stores/useNavigationStore';
import usePlayAudio from '@/hooks/usePlayAudio';

export default function Controls({ currentPage, numPages, currentPageText, fileName }) {
  const { ripples, onClick, onClear } = useRipple();
  const { isPlaying, togglePlayPause, cleanup, isLoading } = usePlayAudio(currentPageText, numPages, currentPage)
  const { goToNextPage, goToPreviousPage } = useNavigationStore()

  // Handling page navigation and audio cleanup
  const handlePreviousPage = () => {
    cleanup()
    goToPreviousPage(numPages);
  };

  const handleNextPage = () => {
    cleanup()
    goToNextPage(numPages);
  };


  return (
    <div className="fixed bottom-4 z-50 mx-3 mt-10 flex h-[4.5rem] w-[22rem] items-center justify-between rounded-full bg-slate-950/80 p-4 text-sm font-medium backdrop-blur-sm md:w-96">
      <span className="flex cursor-pointer items-center justify-center p-4">
        <AnimatedLike fileName={fileName} size={24} color="#6b7280" />
      </span>
      <button
        className={`justify-items flex cursor-pointer items-center p-3 ${currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'text-gray-500 hover:text-white'
          }`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <TbArrowBackUp size={30} />
      </button>

      <button
        className="z-10 relative cursor-pointer overflow-hidden rounded-full bg-blue-900/50 p-3 text-white shadow-sm hover:bg-blue-900/70"
        onClick={() => togglePlayPause()}
        disabled={isLoading}  // Disable the button while loading
      >
        {isLoading ? <Loading /> : (isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />)}
        <Ripple ripples={ripples} onClick={onClick} onClear={onClear} className="absolute inset-0" />
      </button>

      <button
        className={`justify-items flex cursor-pointer items-center p-3 ${currentPage === numPages ? 'cursor-not-allowed text-neutral-700' : 'text-gray-300 hover:text-white'
          }`}
        onClick={handleNextPage}
        disabled={currentPage === numPages}
      >
        <TbArrowForwardUp size={30} />
      </button>

      <Dialog>
        <DialogTrigger>
          <button className="justify-items flex cursor-pointer items-center p-3 text-gray-500 hover:text-white">
            <FaGear size={20} />
          </button>
        </DialogTrigger>
        <DialogContent>
          <StyledDropdownMenu />
        </DialogContent>
      </Dialog>
    </div >
  );
}
