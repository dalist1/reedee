import DropZone from "@/components/DropZone";

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

export default function UploadButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="group/button border transform transition-transform duration-50 active:scale-95 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 border-pink-500 hover:border-pink-600 disabled:bg-pink-500 disabled:border-pink-500 focus-visible:ring-pink-600 text-base leading-6 space-x-3 rounded-2xl !py-3 !px-11 h-[50px] text-white font-semibold shadow-[0px_0px_24px_rgba(0,_0,_0,_0.04)] bg-[linear-gradient(76.35deg,_#801AE6_15.89%,_#A21AE6_89.75%)] hover:bg-[linear-gradient(76.35deg,_#660AC2_15.89%,_#850AC2_89.75%)] focus:bg-[linear-gradient(76.35deg,_#4D0891_15.89%,_#630891_89.75%)]">
          Upload
        </button>
      </DialogTrigger>
      <DialogContent>
        <DropZone />
      </DialogContent>
    </Dialog>
  );
}