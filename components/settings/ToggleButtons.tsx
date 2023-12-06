"use client"

import { useRipple } from '../ui/use-ripple';
import Ripple from '../ui/ripple';
import { TbMultiplier1X, TbMultiplier15X, TbMultiplier2X } from "react-icons/tb";
import { ReactNode } from 'react';
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

const Button = ({ index }) => {
    const { selectedSize, setSelectedSize } = useTextStore();
    const { ripples, onClick: rippleOnClick, onClear } = useRipple();
    const ic = toggleConfig[index];

    const isActive = selectedSize === index;

    const handleButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setSelectedSize(index);
        rippleOnClick(event);
    }

    return (
        <button
            className={`relative overflow-hidden hover:text-white p-2.5 text-gray-300 rounded-xl ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-950/30 text-slate-300'}`}
            onClick={handleButtonClick}>
            {ic.icon}
            <Ripple ripples={ripples} onClear={onClear} className="absloute inset-0"/>
        </button>
    );
}

export default function ToggleButton() {
    return (
        <div className="flex gap-x-2">
            {toggleConfig.map((_, index) => (
                <Button key={index} index={index} />
            ))}
        </div>
    );
}

