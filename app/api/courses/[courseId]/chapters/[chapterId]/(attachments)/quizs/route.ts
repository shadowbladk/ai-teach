import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quiz = await db.question.create({
      data: {
        chapterId: params.chapterId,
        text: title,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZ]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
