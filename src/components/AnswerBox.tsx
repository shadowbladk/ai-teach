export default function AnswerBox({
  answer,
  chooseChoice,
}: {
  answer: string;
  chooseChoice: () => void;
}) {
  return (
    <button
      className="h-[60px] p-4 flex flex-col gap-4 border-4 rounded-xl bg-white w-full lg:flex-row items-center justify-center my-2.5"
      onClick={chooseChoice}
    >
      {answer}
    </button>
  );
}
