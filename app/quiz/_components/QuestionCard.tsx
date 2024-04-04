interface QuestionCardProps {
  question: string;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="justify-center flex flex-col border-4 border-indigo-500/100 rounded-xl bg-white">
      <div className="px-20 py-16">
        <p className="text-[20px] font-normal text-left text-black">
          {question}
        </p>
      </div>
    </div>
  );
}
