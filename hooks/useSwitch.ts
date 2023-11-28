// useSwitch.ts path is at @/hooks/useSwitch.ts

import React, { useState } from 'react';

type Option = {
    name: string;
    icon: React.ReactNode;
    index?: number;
    checked: boolean;
    options?: Option[];
 }

 export default function useSwitch(initialOptions: Option[]) {
    const [options, setOptions] = useState(initialOptions);
  
    const toggleChecked = (options: Option[], index: number, subIndex?: number): Option[] => {
      return options.map((option, i) => {
          if (i === index) {
              if (subIndex !== undefined && option.options) {
                 return {
                     ...option,
                     options: toggleChecked(option.options, subIndex),
                 };
              } else {
                 return { ...option, checked: !option.checked };
              }
          }
          return option;
      });
  };

  const handleSwitchChange = (index: number, subIndex?: number) => {
      setOptions(prevOptions => toggleChecked(prevOptions, index, subIndex));
  };

     
    return { options, handleSwitchChange };
  }