import { ChapterActions } from "./_components/chapter-actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const chapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [
    chapter.title,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <div className="max-w-[720px] mx-auto flex flex-wrap">
      <div className="w-full">
        <ChapterActions 
        disabled={!isComplete}
        courseId={params.courseId}
        chapterId={params.chapterId}
        isPublished={chapter.isPublished}
        />
      </div>
    </div>
  );
};
export default chapterIdPage;
