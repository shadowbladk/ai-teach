import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { courseId: string; chapterId: string; questionId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteQuiz = await db.question.delete({
      where: {
        id: params.questionId,
      },
    });

    return NextResponse.json(deleteQuiz);
  } catch (error) {
    console.log("[QUESTION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string; questionId: string };
  }
) {
  try {
    
    const { userId } = auth();
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const quiz = await db.question.update({
      where: {
        id: params.questionId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUESTION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
