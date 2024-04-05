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
      documentId: string;
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

    const document = await db.document.findUnique({
      where: {
        id: params.documentId,
        chapterId: params.chapterId,
      },
    });

    if (!document) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const publishedDocument = await db.document.update({
      where: {
        id: params.documentId,
        chapterId: params.chapterId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(publishedDocument);
  } catch (error) {
    console.log("[DOCUMENT_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
