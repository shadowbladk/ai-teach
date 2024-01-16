import { db } from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string,
): Promise<number> => {
    try {
        const publishedChapters = null

        // TODO: calculate progress based on published chapters
        return 0;
    } catch (error) {
        console.log("[GET_PROGRESS]", error)
        return 0;
    }
}