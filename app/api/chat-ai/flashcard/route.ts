import { NextResponse } from "next/server";
import { getCompletion } from "@/lib/completion";

interface Flashcard {
  front: string;
  back: string;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const frontCompletion = await getCompletion(
      `create a flashcard with the front side (keyword): ${message}`
    );
    const backCompletion = await getCompletion(
      `create a flashcard with the back side (definition): ${message}`
    );

    const flashcard: Flashcard = {
      front: frontCompletion,
      back: backCompletion,
    };

    return new NextResponse(JSON.stringify(flashcard));
  } catch (error) {
    console.log("[CHAT AI]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
