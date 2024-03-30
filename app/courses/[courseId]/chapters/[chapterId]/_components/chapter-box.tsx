interface ChapterBoxProps {
  documentIds: string;
  flashcardIds: string;
  questionIds: string;
}
export const ChapterBox = ({
  documentIds,
  flashcardIds,
  questionIds,
}: ChapterBoxProps) => {
  return (
    <div className="w-full mb-6 mx-auto rounded-lg p-3 flex items-center justify-between drop-shadow-md bg-primary">
      <p className="text-sm text-black font-semibold lg:text-base">Hello</p>
    </div>
  );
};
