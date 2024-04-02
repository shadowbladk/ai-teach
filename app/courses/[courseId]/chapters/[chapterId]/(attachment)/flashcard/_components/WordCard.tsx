import { ArrowLeftRight } from "lucide-react";
import React from "react";

interface WordCardProps {
  word: string;
  definition: string;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  definition,
  isFlipped,
  setIsFlipped,
}) => {
  return (
    <div className="relative flex justify-center items-start w-full px-8">
      <div className="flex flex-col border-4 border-purple-500/100 rounded-xl bg-white p-4 w-full max-w-[440px] h-[280px] relative">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 p-2 z-10"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {<ArrowLeftRight />}
        </button>
        <div className="p-4 h-full pt-8">
          <p className="text-[20px] font-normal text-center text-black h-full flex items-center justify-center">
            {isFlipped ? definition : word}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
