import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
      chapterId: string;
      questionsetId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteQuestionSet = await db.questionSet.delete({
      where: {
        id: params.questionsetId,
        chapterId: params.chapterId,
      },
    });

    return NextResponse.json(deleteQuestionSet);
  } catch (error) {
    console.log("[QUESTION_SET_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
      chapterId: string;
      questionsetId: string;
    };
  }
) {
  console.log("[QUESTION_ID]", params);
  try {
    const { userId } = auth();
    const value = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const questionSet = await db.questionSet.update({
      where: {
        id: params.questionsetId,
        chapterId: params.chapterId,
      },
      data: {
        ...value,
      },
    });

    return NextResponse.json(questionSet);
  } catch (error) {
    console.log("[QUESTION_SET_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
