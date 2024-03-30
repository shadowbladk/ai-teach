import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

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
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const questionSet = await db.questionSet.findUnique({
      where: {
        id: params.questionsetId,
        chapterId: params.chapterId,
      },
    });

    if (!questionSet) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const publishedQuestionSet = await db.questionSet.update({
      where: {
        id: params.questionsetId,
        chapterId: params.chapterId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedQuestionSet);
  } catch (error) {
    console.log("[QUESTIONSET_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
