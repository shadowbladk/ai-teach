import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

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

    const document = await db.document.create({
      data: {
        url,
        name: url.split("/").pop(),
        chapterId: params.chapterId,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.log("[DOCUMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
