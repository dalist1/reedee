import { useReducer, useCallback } from 'react';
import useSwitch from '@/hooks/useSwitch';
import OptionsList from '@/components/settings/OptionsList';
import { mainMenuConfig } from '@/components/settings/config'
import { motion, AnimatePresence } from 'framer-motion'

// Icons
import { IoIosArrowForward as ArrowForward } from 'react-icons/io';
import { IoIosArrowBack as ArrowBack } from "react-icons/io";

type SubmenuOption = {
    name: string;
    icon: React.ReactNode;
    options?: Object[];
}

type State = {
    isOpen: boolean;
    menuLevel: number;
    selectedOptionIndex: number | null;
}

type Action = {
    type: 'OPEN' | 'CLOSE' | 'INCREMENT_MENU_LEVEL' | 'DECREMENT_MENU_LEVEL' | 'SET_SELECTED_OPTION_INDEX';
    payload?: number;
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, isOpen: true };
        case 'CLOSE':
            return { ...state, isOpen: false };
        case 'INCREMENT_MENU_LEVEL':
            return { ...state, menuLevel: state.menuLevel + 1 };
        case 'DECREMENT_MENU_LEVEL':
            return { ...state, menuLevel: state.menuLevel - 1 };
        case 'SET_SELECTED_OPTION_INDEX':
            return { ...state, selectedOptionIndex: action.payload };
        default:
            return state;
    }
};

export default function SettingsModal(): React.ReactNode {
    const { options, handleSwitchChange } = useSwitch(mainMenuConfig);
    const [state, dispatch] = useReducer(reducer, { isOpen: true, menuLevel: 1, selectedOptionIndex: null });

    const handleOptionClick = useCallback((option: SubmenuOption, index: number) => {
        if (option.options) {
            dispatch({ type: 'INCREMENT_MENU_LEVEL' });
            dispatch({ type: 'SET_SELECTED_OPTION_INDEX', payload: index });
        } else {
            dispatch({ type: 'CLOSE' });
        }
    }, []);

    return (
        <div className='p-3'>
            <AnimatePresence>
                {state.isOpen && (
                    <>
                        {state.menuLevel === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-slate-900 p-5 flex flex-col justify-center items-center text-white rounded-3xl"
                            >
                                <span className='font-semibold my-5 text-xl'>
                                    Settings
                                </span>
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOptionClick(option, index)}
                                        className="flex items-center justify-between w-full hover:bg-slate-500/20 p-4 rounded-2xl cursor-pointer"
                                    >
                                        <div className="bg-slate-950 p-4 rounded-full hover:bg-slate-900">
                                            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
                                                {option.icon}
                                            </span>
                                        </div>
                                        <span className='flex justify-center items-center'>{option.name}</span>
                                        <div>
                                            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
                                                <ArrowForward />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        {state.menuLevel > 1 && state.selectedOptionIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col p-4 justify-center items-center gap-y-2 text-white rounded-3xl bg-slate-900"
                            >
                                <div className='flex justify-center gap-x-4 my-3 items-center'>
                                    <button onClick={() => dispatch({ type: 'DECREMENT_MENU_LEVEL' })} className='hover:text-gray-200 hover:bg-gray-400/5 rounded-full text-white p-3 '>
                                        <ArrowBack />
                                    </button>
                                    <span className='font-semibold my-5 text-xl'>
                                        {options[state.selectedOptionIndex].name}
                                    </span>
                                </div>
                                <OptionsList options={options[state.selectedOptionIndex].options} handleSwitchChange={handleSwitchChange} mainIndex={state.selectedOptionIndex} />
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
