import { useState } from "react";

export default function AnswerBox({
  answer,
  chooseChoice,
}: {
  answer: string;
  chooseChoice: () => void;
}) {
  const [borderColor, setBorderColor] = useState("border-gray-200");

  const Click = () => {
    chooseChoice();
    setBorderColor("border-red-300");
  };

  const resetBorder = () => {
    setBorderColor("border-gray-200");
  };

  return (
    <button
      className={`h-[60px] p-4 flex flex-col gap-4 border-4 rounded-xl bg-white w-full lg:flex-row items-center justify-center my-2.5 ${borderColor}`}
      onClick={Click}
      onBlur={resetBorder}
    >
      {answer}
    </button>
  );
}
