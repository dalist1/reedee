import { AiOutlineExpandAlt } from "react-icons/ai";
import { useTextStore } from '@/stores/useTextStore';
import { useBionicStore } from "@/stores/useBionicStore";
import { Fragment } from "react";
import { splitTextIntoBionicComponents, splitSentence, cn } from "@/lib/utils";

function TextElement({ sentence, isHighlighted, sizeClass }) {
  const Element = isHighlighted ? 'mark' : 'span';
  const className = cn(isHighlighted ? "bg-[#4B4DED] font-semibold rounded-2xl px-1.5 text-white" : "px-1", sizeClass);
  return <Element className={className}>{sentence}</Element>;
}

export default function PageContent({ currentPageText, currentPage, numPages, playingSentence, isPlaying }) {
  const { selectedSize, sizeClasses } = useTextStore();
  const sizeClass = sizeClasses[selectedSize];
  const isBionicEnabled = useBionicStore((st) => st.isBionicEnabled);

  const sentences = splitSentence(currentPageText);
  const textElements = sentences.map((sentence, index) => {
    const isHighlighted = isPlaying && playingSentence === sentence;
    return (
      <TextElement
        key={index}
        sentence={isBionicEnabled ? splitTextIntoBionicComponents(sentence) : sentence}
        isHighlighted={isHighlighted}
        sizeClass={sizeClass}
      />
    );
  });

  return (
    <div className="sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full">
      <div className="flex flex-col col-span-6 md:col-span-3 bg-gray-800 p-6 rounded-3xl justify-end relative">
        <div className="flex justify-end items-center pb-3">
          <span className="text-gray-500 !mx-auto">{`${currentPage}/${numPages}`}</span>
          <AiOutlineExpandAlt
            className="cursor-pointer p-2 right-0 hover:bg-white/40 rounded-xl mb-4"
            size={40}
          />
        </div>
        <div className={cn("text-base", sizeClass)} aria-live="polite">
          {textElements}
        </div>
      </div>
    </div>
  );
}
