// filename OptionsList.js
import { FC } from 'react';
import { Switch } from '@/components/ui/switch'
import { IconType } from 'react-icons'

type Option = {
 name: string;
 icon: React.ReactNode;
 checked: boolean;
};

type SwitchChangeHandler = (mainIndex: number, index: number) => void;

type OptionsListProps = {
 options: Option[];
 handleSwitchChange: SwitchChangeHandler;
 mainIndex: number;
};


const OptionsList: FC<OptionsListProps> = ({ options, handleSwitchChange, mainIndex }) => {
 return (
  <div className='flex flex-col justify-center items-center bg-slate-900 p-10 text-white rounded-2xl'>
    {options.map((option, index) => (
      <div
        key={index}
        className="flex flex-row w-full justify-around items-center hover:bg-slate-500/20 p-2 rounded-2xl cursor-pointer"
      >
        <div className="bg-slate-950 p-4 rounded-full hover:bg-slate-900 hover:bg-slate-500/20">
          <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
            {option.icon}
          </span>
        </div>
        <span>{option.name}</span>
        <Switch id={`switch-${index}`} checked={option.checked} onCheckedChange={() => handleSwitchChange(mainIndex, index)} />
      </div>
    ))}
  </div>
 );
};

export default OptionsList;
