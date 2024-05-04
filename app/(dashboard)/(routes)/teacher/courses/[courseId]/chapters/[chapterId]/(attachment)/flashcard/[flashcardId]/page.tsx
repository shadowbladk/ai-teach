import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

import { db } from "@/lib/db";
import { Banner } from "@/components/banner";

import { FlashcarddeckTitleForm } from "./_components/flashcarddeck-title-form";
import { FlashcardForm } from "./_components/flashcard-form";
import { Actions } from "./_components/actions";

const FlashcardPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    flashcardId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const flashcarddeck = await db.flashcarddeck.findUnique({
    where: {
      id: params.flashcardId,
    },
    include: {
      flashcards: {
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });

  if (!flashcarddeck) {
    return redirect("/");
  }

  return (
    <>
      {!flashcarddeck?.isPublic && (
        <Banner label="This flashcarddeck is unpublished. It will not be visible to the students." />
      )}
      <div className="flex flex-col items-center justify-center px-4 py-16 gap-8">
        <div className="flex items-center w-4/5 max-w-7xl justify-between">
          <div className="flex flex-row gap-2 items-center justify-center">
            {/* <div className="flex items-center gap-x-2"> */}
            <GalleryVerticalEnd />
            <h1 className="text-2xl font-medium">Flash Card</h1>
            {/* </div> */}
          </div>
          <Actions
      
            disabled={false}
            courseId={params.courseId}
            chapterId={params.chapterId}
            flashcarddeckId={params.flashcardId}
            isPublished={flashcarddeck.isPublic}
          />
        </div>
        {/* <div className="grid gap-6 w-full justify-center"> */}
        <div className="flex flex-col gap-8 w-4/5 max-w-7xl justify-center">
          <FlashcarddeckTitleForm
            initialData={flashcarddeck}
            courseId={params.courseId}
            chapterId={params.chapterId}
            flashcarddeckId={params.flashcardId}
          />
          <hr className="border-t-4 rounded-md border-gray-400" />
          <FlashcardForm
            initialData={flashcarddeck.flashcards}
            courseId={params.courseId}
            chapterId={params.chapterId}
            flashcarddeckId={params.flashcardId}
          />
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default FlashcardPage;
