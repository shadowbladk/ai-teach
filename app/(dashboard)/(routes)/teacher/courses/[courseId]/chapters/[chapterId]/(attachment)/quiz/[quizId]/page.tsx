import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { PencilRuler } from "lucide-react"

import { db } from "@/lib/db"
import { IconBadge } from "@/components/icon-badge"
import { Banner } from "@/components/banner"

import { QuizTitleForm } from "./_components/quiz-title-form"
import { QuizForm } from "./_components/quiz-form"
import { QuizAnswerForm } from "./_components/quiz-answer-form"
import { Actions } from "./_components/actions"
import { Button } from "@/components/ui/button"

const QuizPage = async ({
  params,
}: {
  params: {
    courseId: string
    chapterId: string
    questionsetId: string
  }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const quiz = await db.questionSet.findUnique({
    where: {
      id: params.questionsetId,
    },
    include: {
      Question: {
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });

  if (!quiz) {
    return redirect("/")
  }

  return (
    <>
      {/* {!quiz?.isPublished && ( */}
        <Banner label="This course is unpublished. It will not be visible to the students." />
      {/* )} */}
      <div className="flex flex-col items-center justify-center w-full px-4 py-16 gap-8 ">
        <div className="flex items-center w-4/5 max-w-7xl justify-between">
          <div className="flex flex-row gap-2 items-center justify-center">
            <PencilRuler />
            <h1 className="text-2xl font-medium">Quiz</h1>
          </div>

          {/* <Actions
            // disabled={!isComplete}
            disabled={true}
            courseId={params.courseId}
            isPublished={course.isPublished}
          /> */}
        </div>

        <div className="flex flex-col gap-8 w-4/5 max-w-7xl justify-center">
          <QuizTitleForm initialData={quiz}
            courseId={params.courseId}
            chapterId={params.chapterId}
            questionsetId={params.questionsetId} />
          <hr className="border-t-4 rounded-md border-gray-400" />
          <QuizForm initialData={quiz.Question}
            courseId={params.courseId}
            chapterId={params.chapterId}
            questionsetId={params.questionsetId} />
        </div>
      </div>
    </>
  )
}

export default QuizPage
