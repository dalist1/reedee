import { MdOutlineDarkMode as DarkMode } from "react-icons/md";
import { HiMiniBarsArrowDown as BarsArrowDown, HiMiniBarsArrowUp as BarsArrowUp } from "react-icons/hi2";
import { LuCaseSensitive as Case } from 'react-icons/lu';
import { GiBolas } from 'react-icons/gi';
import { RiPaletteLine as Palette } from 'react-icons/ri';
import { PiMagicWandFill as MagicWand } from 'react-icons/pi';

export const mainMenuConfig = [
  {
    name: 'Appearance',
    icon: <Palette />,
    options: [
      { name: 'Dark Mode', icon: <DarkMode />, component: 'switch' }
    ],
  },
  {
    name: 'Typography',
    icon: <Case />,
    options: [
      { name: 'Bionic Text', icon: <GiBolas />, component: 'switch' },
      { name: 'Text Size', icon: <Case />, component: 'toggle' },
    ],
  },
  {
    name: 'Assistant',
    icon: <MagicWand />,
    options: [
      { name: 'Summary', icon: <BarsArrowUp />, component: 'switch' },
      { name: 'Takeaways', icon: <BarsArrowDown />, component: 'switch' },
    ],
  },
];
