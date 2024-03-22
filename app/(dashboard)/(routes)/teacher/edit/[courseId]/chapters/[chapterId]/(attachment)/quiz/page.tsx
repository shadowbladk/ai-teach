import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PencilRuler } from "lucide-react";

import { db } from "@/lib/db";
import { Banner } from "@/components/banner";

import { QuizTitleForm } from "./_components/quiz-title-form";
import { QuizForm } from "./_components/quiz-form";
import { Actions } from "./_components/actions";

const QuizPage = async ({ params }: { params: { courseId: string } }) => {
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

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
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
            <h1 className="text-2xl font-medium">Quiz</h1>
          </div>

          <Actions
            // disabled={!isComplete}
            disabled={true}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>

        <div className="flex flex-col gap-8 w-4/5 max-w-7xl justify-center">
          <QuizTitleForm initialData={course} courseId={course.id} />
          <hr className="border-t-4 rounded-md border-gray-400" />
          <QuizForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </>
  );
};

export default QuizPage;
