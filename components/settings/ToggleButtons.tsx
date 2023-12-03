"use client"

import { TbMultiplier1X, TbMultiplier15X, TbMultiplier2X } from "react-icons/tb";
import { ReactNode } from 'react'
import { useTextStore } from '@/stores/useTextStore';

type toggleType = {
    icon: ReactNode;
}

const toggleConfig: toggleType[] = [
    {
        icon: <TbMultiplier1X size={20} />
    },
    {
        icon: <TbMultiplier15X size={20} />
    },
    {
        icon: <TbMultiplier2X size={20} />
    },
];

const Button = () => {
    const { selectedSize, setSelectedSize } = useTextStore()

    const handleButtonClick = (buttonId: number) => {
        setSelectedSize(buttonId);
    }
    return toggleConfig.map((ic, index) => {
        const isActive = selectedSize === index;
        return (
            <button
                className={`hover:text-white p-2.5 text-gray-300 rounded-xl ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-950/30 text-slate-300'}`}
                onClick={() => handleButtonClick(index)}>
                {ic.icon}
            </button>
        );
    });
}

export default function ToggleButton() {
    return (
        <div className="flex gap-x-2">
            <Button />
        </div>
    )
}