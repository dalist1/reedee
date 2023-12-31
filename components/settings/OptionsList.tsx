import { FC, useCallback } from 'react';
import { Switch } from '@/components/ui/switch'
import ToggleButton from '@/components/settings/ToggleButtons';
import { useRipple } from '../ui/use-ripple';
import Ripple from '../ui/ripple';
import { Option, OptionsListProps } from "@/types/optionList"

const ButtonWrapper: FC<{ option: Option, index: number, handleCheckedChange: (index: number) => void }> = ({ option, index, handleCheckedChange }) => {
  const { ripples, onClick, onClear } = useRipple();

  return (
    <div
      key={index}
      className="select-none relative z-0 flex w-full justify-between items-center hover:bg-slate-500/20 p-4 px-4 rounded-2xl cursor-pointer overflow-hidden"
      onClick={option.component === 'toggle' ? undefined : (event) => {
        handleCheckedChange(index);
        onClick(event);
      }}
    >
      <Ripple ripples={ripples} onClear={onClear} className="absloute inset-0"/>
      <div className="bg-slate-950 p-4 justify-start items-center rounded-full">
        <span className="flex justify-start text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
          {option.icon}
        </span>
      </div>
      <span>{option.name}</span>
      <span>
        {option.component === 'switch' &&
          <Switch
            id={`switch-${index}`}
            checked={option.checked}
            onCheckedChange={() => handleCheckedChange(index)}
            className='pointer-events-none'
          />}
        {option.component === 'toggle' && <ToggleButton />}
      </span>
    </div>
  );
};

const OptionsList: FC<OptionsListProps> = ({ options, handleSwitchChange, mainIndex }) => {
  const handleCheckedChange = useCallback((index: number) => {
    handleSwitchChange(mainIndex, index);
    options[index].handler();
  }, [options, handleSwitchChange, mainIndex]);

  return (
    <div className='flex flex-col justify-between items-center w-full'>
      {options.map((option, index) => (
        <ButtonWrapper key={index} option={option} index={index} handleCheckedChange={handleCheckedChange} />
      ))}
    </div>
  );
};

export default OptionsList;
