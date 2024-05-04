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

    const questionSet = await db.questionSet.create({
      data: {
        chapterId: params.chapterId,
        title: title,
      },
    });

    return NextResponse.json(questionSet);
  } catch (error) {
    console.log("QUESTION_SET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
