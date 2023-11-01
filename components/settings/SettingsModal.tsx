"use client"

import { RiPaletteLine } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { LuCaseSensitive } from 'react-icons/lu';
import { PiMagicWandFill } from 'react-icons/pi';

export default function SettingsModal() {

  return (
    <div className="py-10">
      <div className="text-white relative mx-auto max-w-md space-y-4 overflow-y-scroll rounded-xl bg-slate-900 shadow-sm p-10">
        <div className="flex flex-col justify-center items-center pb-9">
          <span className="font-bold text-lg">Settings</span>
        </div>
        <div className="flex justify-around items-center hover:bg-slate-500/20 p-2 rounded-xl cursor-pointer">
          <div className="bg-slate-950 p-4 rounded-full hover:bg-slate-900">
            <span className="cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              <RiPaletteLine />
            </span>
          </div>
          <span>Appearance</span>
          <div>
            <span className="cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              <IoIosArrowForward />
            </span>
          </div>
        </div>
        <div className="flex justify-around items-center hover:bg-slate-500/20 p-2 rounded-xl cursor-pointer">
          <div className="bg-slate-950 p-4 rounded-full hover:bg-slate-900">
            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              <LuCaseSensitive />
            </span>
          </div>
          <span>Typography</span>
          <div>
            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              <IoIosArrowForward />
            </span>
          </div>
        </div>
        <div className="flex justify-around items-center hover:bg-slate-500/20 p-2 rounded-xl cursor-pointer">
          <div className="bg-slate-950 p-4 rounded-full hover:bg-slate-900">
            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              <PiMagicWandFill />
            </span>
          </div>
          <span>Assistant</span>
          <div>
            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              <IoIosArrowForward />
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
};