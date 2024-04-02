import React, { useState } from "react";

interface FlashcardGroupProps {
  submitAnswer: (answer: any) => void;
}

const FlashcardGroup: React.FunctionComponent<FlashcardGroupProps> = ({
  submitAnswer,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string>("");

  return (
    <>
      <div className="py-10 flex justify-between w-[440px] mx-auto">
        <button
          className="px-4 py-2 bg-red-400 text-white font-bold w-1/2 mr-2"
          onClick={() => submitAnswer("dontKnow")}
        >
          Don't Know
        </button>
        <button
          className="px-4 py-2 bg-green-400 text-white font-bold w-1/2 ml-2"
          onClick={() => submitAnswer("know")}
        >
          Know
        </button>
      </div>
    </>
  );
};

export default FlashcardGroup;
