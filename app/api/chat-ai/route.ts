import { NextResponse } from "next/server";
import { getCompletion } from "@/lib/completion";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // AI logic goes here
    const completion = await getCompletion(message);
    return new NextResponse(completion);
  } catch (error) {
    console.log("[CHAT AI]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
