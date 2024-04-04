import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { PencilRuler } from "lucide-react";
import { Banner } from "@/components/banner";
import { VideoForm } from "./_components/video-form";

const video = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const requiredFields = [1];
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <Banner label="This PDF is unpublished. It will not be visible to the students." />
      <div className="flex flex-col items-center justify-center w-full px-4 py-16 gap-8 ">
        <div className="flex items-center w-4/5 max-w-7xl justify-between">
          <div className="flex flex-row gap-2 items-center justify-center">
            <PencilRuler />
            <h1 className="text-2xl font-medium">Videos Form</h1>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-4/5 max-w-7xl justify-center">
          <hr className="border-t-4 rounded-md border-gray-400" />
          <VideoForm courseId={params.courseId} chapterId={params.chapterId} />
        </div>
      </div>
    </>
  );
};
export default video;
