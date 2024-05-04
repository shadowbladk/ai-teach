import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
      chapterId: string;
      questionId: string;
      answerId: string;
    };
  }
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

    const deleteAnswer = await db.answer.delete({
      where: {
        id: params.answerId,
      },
    });

    return NextResponse.json(deleteAnswer);
  } catch (error) {
    console.log("[ANSWER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string; questionId: string; answerId: string; };
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

    const updateAnswer = await db.answer.update({
      where: {
        id: params.answerId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(updateAnswer);
  } catch (error) {
    console.log("[QUESTION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}