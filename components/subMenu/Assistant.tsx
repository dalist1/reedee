import React from 'react';
import { Switch } from '@/components/ui/switch';
import { HiMiniBarsArrowDown as BarsArrowDown, HiMiniBarsArrowUp as BarsArrowUp } from "react-icons/hi2";
import useSwitch from '@/hooks/useSwitch';

const assistantOptions = [
  { name: 'Summary', icon: <BarsArrowUp />, checked: false },
  { name: 'Takeaways', icon: <BarsArrowDown />, checked: false },
];

export default function Assistant() {
  const { options, handleSwitchChange } = useSwitch(assistantOptions);

  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          className="flex flex-row w-full justify-around items-center hover:bg-slate-500/20 p-2 rounded-2xl cursor-pointer text-white"
        >
          <div className="bg-slate-950 p-4 rounded-full hover:bg-slate-900">
            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              {option.icon}
            </span>
          </div>
          <span>{option.name}</span>
          <Switch id={`switch-${index}`} checked={option.checked} onCheckedChange={() => handleSwitchChange(index)} />
        </div>
      ))}
    </>
  );
};
