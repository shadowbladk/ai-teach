import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { GalleryVerticalEnd } from "lucide-react"

import { db } from "@/lib/db"
import { IconBadge } from "@/components/icon-badge"
import { Banner } from "@/components/banner"

import { FlashcardTitleForm } from "./_components/flashcard-title-form"
import { FlashcardForm } from "./_components/flashcard-form"
import { Actions } from "./_components/actions"
import { Button } from "@/components/ui/button"

const FlashcardPage = async ({
  params,
}: {
  params: { flashcardId: string }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const flashcardDeck = await db.flashcardDeck.findUnique({
    where: {
      id: params.flashcardId,
    },
  })

  const flashcards = await db.flashcard.findMany({
    where: {
      flashcardDeckId: params.flashcardId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <>
      {/* {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )} */}
      <div className="flex flex-col items-center justify-center px-4 py-16 gap-12">
        <div className="flex items-center w-4/5 max-w-7xl justify-between">
          <div className="flex flex-row gap-2 items-center justify-center">
            {/* <div className="flex items-center gap-x-2"> */}
            <GalleryVerticalEnd />
            <h1 className="text-2xl font-medium">Flash Card</h1>
            {/* </div> */}
          </div>
          {/* <Actions
            // disabled={!isComplete}
            disabled={true}
            courseId={params.chapterId}
            isPublished={chapter.isPublished}
          /> */}
        </div>
        {/* <div className="grid gap-6 w-full justify-center"> */}
        <div className="flex flex-col gap-6 w-4/5 max-w-7xl justify-center">
          <FlashcardTitleForm
            initialData={flashcardDeck!}
            // flashcardId={}
          />
          <hr className="border-t-4 rounded-md border-gray-400" />
          {/* <QuizQuestionForm initialData={course} courseId={course.id} /> */}
          {/* {questions.map((question, index) => (<QuizAnswerForm initialData={course} courseId={course.id} />))}
            <Button variant="outline" size="sm">
              Add question
         </Button> */}
          <FlashcardForm initialData={chapter} courseId={chapter.id} />
        </div>
        {/* </div> */}
      </div>
    </>
  )
}

export default FlashcardPage
