import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { GalleryVerticalEnd } from 'lucide-react';

import { db } from "@/lib/db"
import { IconBadge } from "@/components/icon-badge"
import { Banner } from "@/components/banner"

import { FlashcardTitleForm } from "./_components/flashcard-title-form"
import { FlashcardForm } from "./_components/flashcard-form"
import { FlashcardCardForm } from "./_components/flashcard-card-form"
import { Actions } from "./_components/actions"
import { Button } from "@/components/ui/button"

const FlashcardPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
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
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  if (!course) {
    return redirect("/")
  }

  return (
    <>
      {/* {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )} */}
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              <GalleryVerticalEnd />
              <h1 className="text-2xl font-medium">Flash Card</h1>
            </div>
          </div>
          {/* <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          /> */}
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col gap-6 max-w-5xl">
            <FlashcardTitleForm initialData={course} courseId={course.id} />
            <hr className="border-t-4 rounded-md border-gray-400" />
            {/* <QuizQuestionForm initialData={course} courseId={course.id} /> */}
            {/* {questions.map((question, index) => (<QuizAnswerForm initialData={course} courseId={course.id} />))}
            <Button variant="outline" size="sm">
              Add question
         </Button> */}
            <FlashcardForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default FlashcardPage
