import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  params: {
    courseId: string;
    chapterId: string;
    flashcarddeckId: string;
  }
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

    const flashcardDeck = await db.flashcardDeck.create({
      data: {
        chapterId: params.chapterId,
        title: title,
      },
    });

    return NextResponse.json(flashcardDeck);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  params: {
    courseId: string;
    chapterId: string;
    flashcarddeckId: string;
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const flashcardDeck = await db.flashcardDeck.findUnique({
      where: {
        id: params.flashcarddeckId,
      },
    });

    if (!flashcardDeck) {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  params: {
    courseId: string;
    flashcarddeckId: string;
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteFlashcardDeck = await db.flashcardDeck.delete({
      where: {
        id: params.flashcarddeckId,
      },
    });

    return NextResponse.json(deleteFlashcardDeck);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
