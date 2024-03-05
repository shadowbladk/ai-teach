import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";

import { ImageForm } from "./_components/image-form";
import ChapterNavbar from "./_components/chapter-navbar";
import { ChaptersForm } from "./_components/chapters-form";

const EditPage = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
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
      <main className="p-6 h-full">{children}</main>
    </div>
  );
};

export default EditPage;
