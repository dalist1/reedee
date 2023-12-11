"use client"

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

import { FaPlay, FaPause } from 'react-icons/fa6'
import { TbArrowBackUp, TbArrowForwardUp } from 'react-icons/tb'
import { FaGear } from 'react-icons/fa6'
import { useState } from 'react';
import { usePlayAudio } from '@/hooks/usePlayAudio';
import AnimatedLike from "@/components/reading/AnimatedLike"
import StyledDropdownMenu from '@/components/settings/SettingsModal'
import Ripple from '@/components/ui/ripple'
import { useRipple } from '@/components/ui/use-ripple'

export default function Controls({ currentPage, numPages, goToNextPage, goToPreviousPage, currentPageText, fileName }) {
    const { ripples, onClick, onClear } = useRipple();
    const { playAudio, stopAudio } = usePlayAudio(currentPageText);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (isPlaying) {
            stopAudio();
        } else {
            playAudio();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="z-50 flex h-[4.5rem] justify-between items-center w-[22rem] md:w-96 fixed mt-10 mx-3 font-medium text-sm bottom-4 p-4 bg-slate-950/80 backdrop-blur-sm rounded-full">
            <span className="flex justify-center items-center p-4 cursor-pointer">
                <AnimatedLike fileName={fileName} size={24} color="#6b7280" />
            </span>
            <button
                className={`flex cursor-pointer justify-items items-center p-3 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-white'}`}
                onClick={() => currentPage !== 1 && goToPreviousPage()}
                disabled={currentPage === 1}
            >
                <TbArrowBackUp size={30} />
            </button>


            <button className='relative p-3 cursor-pointer shadow-sm bg-blue-900/50 hover:bg-blue-900/70 text-white rounded-full overflow-hidden'
                onClick={(event) => { toggleAudio(); onClick(event) }}>
                {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
                <Ripple ripples={ripples} onClear={onClear} className='absolute inset-0' />
            </button>
            <button
                className={`flex cursor-pointer justify-items items-center p-3 ${currentPage === numPages ? 'text-neutral-700 cursor-not-allowed' : 'text-gray-300 hover:text-white'}`}
                onClick={() => goToNextPage()}
                disabled={currentPage === numPages}
            >
                <TbArrowForwardUp size={30} />
            </button>

            <Dialog>
                <DialogTrigger>
                    <button className='flex cursor-pointer justify-items items-center p-3 text-gray-500 hover:text-white'>
                        <FaGear size={20} />
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <StyledDropdownMenu />
                </DialogContent>
            </Dialog>
        </div >
    )
}