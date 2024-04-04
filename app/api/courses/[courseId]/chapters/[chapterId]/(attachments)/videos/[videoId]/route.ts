import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
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

    const selectVideo = await db.video.findUnique({
      where: {
        id: params.videoId,
        chapterId: params.chapterId,
      },
    });
    if (!selectVideo) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (selectVideo.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          videoId: params.videoId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deleteVideo = await db.video.delete({
      where: {
        id: params.videoId,
      },
    });

    return NextResponse.json(deleteVideo);
  } catch (error) {
    console.log("[VIDEO_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: { params: { courseId: string; chapterId: string; videoId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

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

    const selectVideo = await db.video.update({
      where: {
        id: params.videoId,
        chapterId: params.chapterId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          videoId: params.videoId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          videoId: params.videoId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(selectVideo);
  } catch (error) {
    console.log("[VIDEO_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
