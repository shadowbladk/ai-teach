import React, { useState } from "react";
import AnswerBox from "./AnswerBox";

interface FlashcardGroupProps {
  choices: string[];
  answer: string;
  submitAnswer: (answer: any) => void;
}

const FlashcardGroup: React.FunctionComponent<FlashcardGroupProps> = ({
  choices,
  answer,
  submitAnswer,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string>("");

  return (
    <>
      <div>
        {choices.map((choice) => (
          <AnswerBox
            key={choice}
            answer={choice}
            selectedChoice={selectedChoice}
            onClick={() => setSelectedChoice(choice)}
            choice={choice}
          />
        ))}
      </div>
      <div className="">
      <button
        className="px-4 py-2 bg-green-400 text-white font-bold"
        onClick={() => submitAnswer(selectedChoice)}
      >
        Know
      </button>
      <button
        className="px-4 py-2 bg-red-400 text-white font-bold"
        onClick={() => submitAnswer(selectedChoice)}
      >
        Don't Know
      </button>
      </div>
    </>
  );
};

export default FlashcardGroup;
