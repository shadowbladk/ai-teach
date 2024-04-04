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

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastVideo = await db.video.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const position = lastVideo ? lastVideo.position + 1 : 0;

    const video = await db.video.create({
      data: {
        chapterId: params.chapterId,
        title: title,
        position,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.log("[VIDEO]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
