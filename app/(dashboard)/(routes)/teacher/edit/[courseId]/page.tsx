import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ImageForm } from "./_components/image-form";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import ChapterNavbar from "./_components/chapter-navbar";

const EditPage = async ({ params }: { params: { courseId: string } }) => {
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

  if (!course) {
    return redirect("/");
  }
  if (course.chapters.length === 0) {
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
        <div className="w-full flex-grow justify-center px-6 pt-6 bg-[#F3F4F4]">
          <ChapterNavbar course={course} />
        </div>
      </div>
    );
  }
  return redirect(
    `/teacher/edit/${course.id}/chapters/${course.chapters[0].id}`
  );
};

export default EditPage;
