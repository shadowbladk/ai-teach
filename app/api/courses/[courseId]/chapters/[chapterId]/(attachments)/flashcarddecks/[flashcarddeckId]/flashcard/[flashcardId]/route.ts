import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {params} : {params: {
    courseId: string;
    flashcarddeckId: string;
    flashcardId: string;
  }}
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteFlashcard = await db.flashcard.delete({
      where: {
        id: params.flashcardId,
      },
    });
    return NextResponse.json(deleteFlashcard);
  } catch (error) {
    console.log("[FLASHCARD_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {params} : {params: { courseId: string;
    flashcarddeckId: string;
    flashcardId: string; }}
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json(); 

    const flashcard = await db.flashcard.update({
      where: {
        id: params.flashcardId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(flashcard);
  } catch (error) {
    console.log("[FLASHCARD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

