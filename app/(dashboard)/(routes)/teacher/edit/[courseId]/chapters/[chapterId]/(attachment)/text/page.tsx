import { auth } from "@clerk/nextjs";
import { TextForm } from "./_components/text-form";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PencilRuler } from "lucide-react";
import { Actions } from "./_components/actions";
import { Banner } from "@/components/banner";
import { TextTitleForm } from "./_components/text-title-form";

const text = async ({
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
    include: {
      documents: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  return (
    <>
      {!chapter.isPublished && (
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
            isPublished={chapter.isPublished}
          />
        </div>

        <div className="flex flex-col gap-8 w-4/5 max-w-7xl justify-center">
          {/* <TextTitleForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} /> */}
          <hr className="border-t-4 rounded-md border-gray-400" />
          <TextForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </div>
      </div>
    </>
  );
};
export default text;
