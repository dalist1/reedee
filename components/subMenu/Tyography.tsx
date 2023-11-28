import React from 'react';
import { Switch } from '@/components/ui/switch';
import { LuCaseSensitive } from 'react-icons/lu';
import { GiBolas } from 'react-icons/gi';
import useSwitch from '@/hooks/useSwitch';

const typographyOptions = [
  { name: 'Bionic Text', icon: <GiBolas />, checked: false },
  { name: 'Text Size', icon: <LuCaseSensitive />, checked: false },
];

export default function Typography() {
  const { options, handleSwitchChange } = useSwitch(typographyOptions);

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
