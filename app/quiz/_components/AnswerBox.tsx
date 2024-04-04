import { ComponentProps } from "react";

interface AnswerBoxProps extends ComponentProps<"button"> {
  answer: string;
  choice: string;
  selectedChoice: string;
}

export default function AnswerBox({
  answer,
  choice,
  selectedChoice,
  ...props
}: AnswerBoxProps) {
  return (
    <button
      {...props}
      className={`h-[60px] p-4 flex flex-col gap-4 border-4 rounded-xl bg-white w-full lg:flex-row items-center justify-center my-2.5 ${
        choice === selectedChoice ? "border-red-300" : "border-gray-200"
      }`}
    >
      {answer}
    </button>
  );
}
