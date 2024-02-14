interface WordCardProps {
  word: string;
}

export default function WordCard({ word }: WordCardProps) {
  return (
    <div className="justify-center flex flex-col border-4 border-purple-500/100 rounded-xl bg-white">
      <div className="px-20 py-16">
        <p className="text-[20px] font-normal text-left text-black">{word}</p>
      </div>
    </div>
  );
}
