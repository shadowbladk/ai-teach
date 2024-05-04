import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string; flashcarddeckId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteFlashcardDeck = await db.flashcarddeck.delete({
      where: {
        id: params.flashcarddeckId,
        chapterId: params.chapterId,
      },
    });

    return NextResponse.json(deleteFlashcardDeck);
  } catch (error) {
    console.log("[FLASHCARDDECK_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const flashcardDeck = await db.flashcarddeck.update({
      where: {
        id: params.flashcarddeckId,
        chapterId: params.chapterId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(flashcardDeck);
  } catch (error) {
    console.log("[FLASHCARDDECK_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
