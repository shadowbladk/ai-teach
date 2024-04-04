import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export default async function DELETE(
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

    const videoData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
        id: params.videoId,
      },
    });
    if (!videoData) {
      return new NextResponse("Not found", { status: 404 });
    }

    await video.assets.delete(videoData.assetId);
    await db.muxData.delete({
      where: {
        id: videoData.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log("[VIDEO]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
