import React, { useState } from "react";
import AnswerBox from "./AnswerBox";

interface AnswerGroupProps {
  choices: string[];
  answer: string;
  submitAnswer: (answer: any) => void;
}

const AnswerGroup: React.FunctionComponent<AnswerGroupProps> = ({
  choices,
  answer,
  submitAnswer,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string>();

  return (
    <>
      <div>
        {choices.map((choice) => (
          <AnswerBox
            answer={choice}
            key={choice}
            chooseChoice={() => setSelectedChoice(choice)}
          />
        ))}
      </div>

      <button
        className="px-4 py-2 bg-primary text-white font-bold"
        onClick={() => submitAnswer(selectedChoice)}
      >
        Next
      </button>
    </>
  );
};

export default AnswerGroup;
