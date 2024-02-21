import Flipicon from "@/assets/flipicon.svg";
import Image from "next/image";
import React from "react";

interface WordCardProps {
  word: string;
  definition: string;
  isFlipped: boolean; // Add this
  setIsFlipped: (isFlipped: boolean) => void; // Add this
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  definition,
  isFlipped,
  setIsFlipped,
}) => {
  return (
    <div className="justify-center flex flex-col border-4 border-purple-500/100 rounded-xl bg-white p-4">
      <div className="p-4">
        <p className="text-[20px] font-normal text-center text-black items-center">
          {isFlipped ? definition : word}
        </p>
      </div>
      <button
        className="mt-4 grid justify-items-end"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Image src={Flipicon} alt="-" width={50} height={50} />
      </button>
    </div>
  );
};

export default WordCard;
