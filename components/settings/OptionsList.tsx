import { FC, useCallback } from 'react';
import { Switch } from '@/components/ui/switch'
import ToggleButton from '@/components/settings/ToggleButtons';

type Option = {
  name: string;
  icon: React.ReactNode;
  index?: number;
  checked: boolean;
  component?: string;
  options?: Option[];
  handler: () => void;
}

type SwitchChangeHandler = (mainIndex: number, index: number) => void;

type OptionsListProps = {
  options: Option[];
  handleSwitchChange: SwitchChangeHandler;
  mainIndex: number;
};

const OptionsList: FC<OptionsListProps> = ({ options, handleSwitchChange, mainIndex }) => {
  const handleCheckedChange = useCallback((index) => {
    handleSwitchChange(mainIndex, index);
    options[index].handler();
  }, [options, handleSwitchChange, mainIndex]);

  return (
    <div className='flex flex-col justify-between items-center w-full'>
      {options.map((option, index) => (
        <div
          key={index}
          className="flex w-full justify-between items-center hover:bg-slate-500/20 p-4 px-4 rounded-2xl cursor-pointer"
        >
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
              />}
            {option.component === 'toggle' && <ToggleButton />}
          </span>
        </div >
      ))}
    </div>
  );
};

export default OptionsList;
