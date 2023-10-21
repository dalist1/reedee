"use client"

// Shadcn Dialog
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

import { FaPlay, FaPause } from 'react-icons/fa6'
import { TbArrowBackUp, TbArrowForwardUp } from 'react-icons/tb'
import { FaGear } from 'react-icons/fa6'
import { useState } from 'react';
import { usePlayAudio } from '@/hooks/usePlayAudio';
import SettingsModal from "@/components/settings/SettingsModal";
import AnimatedLike from "@/components/AnimatedLike"


export default function Controls({ goToNextPage, goToPreviousPage, currentPageText, fileName }) {
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
        <div className="border z-50 flex h-[4.5rem] justify-between items-center w-96 fixed font-medium text-sm bottom-4 p-4 bg-slate-950/80 backdrop-blur-sm rounded-full">
            <span className="flex justify-cente items-center p-4 cursor-pointer">
                <AnimatedLike fileName={fileName} size={24} color="#6b7280" />
            </span>
            <button className='flex cursor-pointer justify-items items-center p-3 text-gray-500 hover:text-white rounded-full' onClick={goToPreviousPage}>
                <TbArrowBackUp size={30} />
            </button>
            <button className='p-4 cursor-pointer shadow-sm bg-white/20 hover:bg-white/40 text-white rounded-full' onClick={toggleAudio}>
                {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
            </button>
            <button className='flex cursor-pointer justify-items items-center p-3 text-gray-500 hover:text-white' onClick={goToNextPage}>
                <TbArrowForwardUp size={30} />
            </button>
            <Dialog>
                <DialogTrigger>
                    <button className='flex cursor-pointer justify-items items-center p-3 text-gray-500 hover:text-white'>
                        <FaGear size={20} />
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <SettingsModal />
                </DialogContent>
            </Dialog>
        </div>
    )
}