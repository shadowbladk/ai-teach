import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  reg: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await reg.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const flashcarddeck = await db.flashcardDeck.create({
      data: {
        chapterId: params.chapterId,
        title,
      },
    });


    return NextResponse.json(flashcarddeck);
  } catch (error) {
    console.log("[FLASHCARDDECK]", error);
    return new NextResponse("Internal Error", { status: 500 });

  }

}