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
      documentId: string;
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

    // TODO: Implement document deletion

    return NextResponse.json({});
  } catch (error) {
    console.log("[DOCUMENT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
