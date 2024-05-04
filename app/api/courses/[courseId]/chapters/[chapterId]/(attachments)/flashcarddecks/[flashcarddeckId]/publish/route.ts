import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string; flashcarddeckId: string };
  }
) {
  try {
    const { userId } = auth();
    console.log(userId);
    console.log(params);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    console.log(ownCourse);
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const publishedFlashcard = await db.flashcarddeck.update({
      where: {
        id: params.flashcarddeckId,
        chapterId: params.chapterId,
      },
      data: {
        isPublic: true,
      },
    });

    return NextResponse.json(publishedFlashcard);
  } catch (error) {
    console.log("[FLASHCARD_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
