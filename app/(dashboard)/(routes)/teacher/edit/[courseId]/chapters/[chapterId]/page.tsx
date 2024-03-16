import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChapterBox } from "./_components/attachment-box";
import { CreateAttachment } from "./_components/create-attachment";
import { ImageForm } from "./_components/image-form";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ChapterNavbar } from "./_components/chapter-navbar";

const chapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!course) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <div className="flex flex-col w-full items-center lg:items-start justify-center p-6 lg:flex-row bg-white">
        <div className="max-w-xs lg:max-w-md">
          <ImageForm initialData={course} courseId={course.id} />
        </div>
        <div className="flex flex-col gap-5 max-w-[720px] items-center justify-center p-6 lg:items-start">
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
        </div>
      </div>
      <div className="flex w-screen justify-center item-center">
        <ChapterNavbar course={course} />
      </div>
      <div className="w-full justify-center px-6">
        <div className="max-w-[720px] mx-auto flex flex-wrap justify-center">
          <ChapterBox />
          <CreateAttachment
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </div>
      </div>
    </div>
  );
};
export default chapterIdPage;
