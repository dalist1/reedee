import { AiOutlineExpandAlt } from "react-icons/ai";
import { useTextStore } from '@/stores/useTextStore';
import { useBionicStore } from "@/stores/useBionicStore";
import { Fragment } from "react";
import { splitTextIntoBionicComponents } from "@/lib/utils";

export default function PageContent({ pageText }) {
  const { selectedSize, sizeClasses } = useTextStore();
  const sizeClass = sizeClasses[selectedSize];
  const isBionicEnabled = useBionicStore((st) => st.isBionicEnabled)

  const text = isBionicEnabled
    ? splitTextIntoBionicComponents(pageText)
    : pageText.split(' ').map((word, i) => <Fragment key={i}>{word + ' '}</Fragment>);

  return (
    <div className="sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full p-6">
      <div className="flex flex-col col-span-6 md:col-span-3 bg-gray-800 p-6 rounded-3xl justify-end relative">
        <div className="flex justify-end">
          <AiOutlineExpandAlt
            className="cursor-pointer p-2 right-0 hover:bg-white/40 rounded-xl mb-4"
            size={40}
          />
        </div>
        <span className={sizeClass}>{text}</span>
      </div>
    </div>
  );
}
