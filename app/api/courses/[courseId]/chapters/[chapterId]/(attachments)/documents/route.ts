import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //   TODO: Implement document creation

    return NextResponse.json({});
  } catch (error) {
    console.log("[DOCUMENT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
