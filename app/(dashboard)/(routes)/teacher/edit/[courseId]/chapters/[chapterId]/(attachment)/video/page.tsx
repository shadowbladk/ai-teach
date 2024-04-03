import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PencilRuler } from "lucide-react";
import { Actions } from "./_components/actions";
import { Banner } from "@/components/banner";
// import { VideoTitleForm } from "./_components/video-title-form";
// import { ChapterVideoForm } from "./_components/video-from";

const video = async ({
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
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
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
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="flex flex-col items-center justify-center w-full px-4 py-16 gap-8 ">
        <div className="flex items-center w-4/5 max-w-7xl justify-between">
          <div className="flex flex-row gap-2 items-center justify-center">
            <PencilRuler />
            <h1 className="text-2xl font-medium">PDF Files</h1>
          </div>

          <Actions
            // disabled={!isComplete}
            disabled={true}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>

        <div className="flex flex-col gap-8 w-4/5 max-w-7xl justify-center">
          {/* <VideoTitleForm
            initialData={chapter}
            courseId={course.id}
            chapterId={params.chapterId}
          /> */}
          <hr className="border-t-4 rounded-md border-gray-400" />
          {/* <ChapterVideoForm
            initialData={chapter}
            chapterId={params.chapterId}
            courseId={params.courseId}
          /> */}
        </div>
      </div>
    </>
  );
};
export default video;