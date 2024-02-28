import Flipicon from "@/assets/flipicon.svg";
import Image from "next/image";
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
    <div className="relative flex justify-center items-start w-full max-w-[980px] px-8">
      <div className="flex flex-col border-4 border-purple-500/100 rounded-xl bg-white p-4 w-[440px] h-[280px]">
        <div className="p-4 h-full">
          <p className="text-[20px] font-normal text-center text-black h-full flex items-center justify-center">
            {isFlipped ? definition : word}
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex justify-end items-start w-full max-w-[980px]">
        <button
          className="flex items-start mt-4 p-2"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <Image src={Flipicon} alt="Flip" width={50} height={50} />
        </button>
      </div>
    </div>
  );
};

export default WordCard;
