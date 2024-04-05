import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const { userId } = auth();
    const { score, maxScore } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const takeQuiz = await db.takeQuiz.create({
      data: {
        questionSetId: params.quizId,
        userId,
        score,
        maxScore,
      },
    });

    return NextResponse.json(takeQuiz);
  } catch (error) {
    console.log("[TAKE_QUIZ]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
