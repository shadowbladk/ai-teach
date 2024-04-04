import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { courseId: string; chapterId: string; videoId: string } }
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

    const video = await db.muxData.findUnique({
      where: {
        id: params.videoId,
      },
    });

    if (!video) {
      return new NextResponse("Not found", { status: 404 });
    }

    const muxData = await db.muxData.update({
      where: {
        id: params.videoId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(muxData, { status: 200 });
  } catch (error) {
    console.log("[VIDEO_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
