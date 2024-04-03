"use client";

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
}

export const ChapterTitleForm = ({ initialData }: ChapterTitleFormProps) => {
  return (
    <div className="flex flex-row">
      <h1 className="text-xl font-extrabold text-blue md:text-2xl">
        {initialData.title}
      </h1>
    </div>
  );
};
