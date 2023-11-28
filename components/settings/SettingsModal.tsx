import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptionsList from '@/components/settings/OptionsList';
import { mainMenuConfig } from '@/components/settings/config'
import { useCallback } from 'react';

// Icons
import { IoIosArrowForward as ArrowForward } from 'react-icons/io';
import { IoIosArrowBack as ArrowBack } from "react-icons/io";

import useSwitch from '@/hooks/useSwitch';

interface SubmenuOption {
    name: string;
    icon: React.ReactNode;
    options?: Object[];
}

export default function SettingsModal(): React.ReactNode {
    const { options, handleSwitchChange } = useSwitch(mainMenuConfig)
    const [isOpen, setIsOpen] = useState(true);
    const [menuLevel, setMenuLevel] = useState(1);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

    const handleOptionClick = useCallback((option: SubmenuOption, index: number) => {
        if (option.options) {
            setMenuLevel(prevMenuLevel => prevMenuLevel + 1);
            setSelectedOptionIndex(index);
        } else {
            setIsOpen(false);
        }
    }, []);


    return (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {menuLevel === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col justify-center items-center gap-y-2 bg-slate-900 p-10 shadow-lg text-white rounded-3xl"
                            >
                                <span className='font-semibold my-5 text-xl'>
                                    Settings
                                </span>
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOptionClick(option, index)}
                                        className="flex flex-row w-full justify-around items-center hover:bg-slate-500/20 p-2 rounded-2xl cursor-pointer"
                                    >
                                        <div className="bg-slate-950 p-4 rounded-full hover:bg-slate-900">
                                            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
                                                {option.icon}
                                            </span>
                                        </div>
                                        <span>{option.name}</span>
                                        <div>
                                            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
                                                <ArrowForward />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        {menuLevel > 1 && selectedOptionIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className='bg-slate-900 rounded-2xl py-10 gap-y-2 text-white'
                            >
                                <div className='flex justify-center items-center gap-5 pr-10'>
                                    <button onClick={() => setMenuLevel(prevMenuLevel => prevMenuLevel - 1)} className='hover:text-gray-200 hover:bg-gray-400/5 rounded-full text-white p-3 '>
                                        <ArrowBack />
                                    </button>
                                    <span className='font-semibold my-5 text-xl'>
                                        {options[selectedOptionIndex].name}
                                    </span>
                                </div>
                                <OptionsList options={options[selectedOptionIndex].options} handleSwitchChange={handleSwitchChange} mainIndex={selectedOptionIndex} />
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};