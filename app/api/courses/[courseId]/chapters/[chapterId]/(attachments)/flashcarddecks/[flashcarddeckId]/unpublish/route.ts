import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
<<<<<<<< HEAD:app/api/courses/[courseId]/chapters/[chapterId]/(attachments)/flashcarddecks/[flashcarddeckId]/flashcard/[flashcardId]/route.ts
  {
    params,
  }: {
    params: {
      courseId: string;
      flashcardId: string;
    };
  }
========
  { params }: { params: { courseId: string; chapterId: string; flashcarddeckId: string } }
>>>>>>>> 8da497537c437dc4b0c8071e7cc2dd4ab3cbcb30:app/api/courses/[courseId]/chapters/[chapterId]/(attachments)/flashcarddecks/[flashcarddeckId]/unpublish/route.ts
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedFlashcard = await db.flashcardDeck.update({
      where: {
        id: params.flashcarddeckId,
        chapterId: params.chapterId,
      },
      data: {
        isPublic: false,
      },
    });

    return NextResponse.json(unpublishedFlashcard);
  } catch (error) {
    console.log("[FLASHCARD_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
