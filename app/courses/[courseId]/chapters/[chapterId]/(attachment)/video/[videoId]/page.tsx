import { db } from "@/lib/db";
import { VideoPlayer } from "./_components/video-player";
import { redirect } from "next/navigation";
const videoPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    videoId: string;
  };
}) => {
  const video = await db.muxData.findUnique({
    where: {
      id: params.videoId,
    },
  });
  if (!video) {
    return redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <div className="flex-grow">
        <section className="flex flex-col w-screen items-center justify-center p-6">
          <h1 className="text-xl md:text-2xl font-extrabold text-black ">
            {video.title}
          </h1>
          <div className="w-[700px] p-6 items-center">
            <VideoPlayer
              playbackId={params.videoId}
              courseId={params.courseId}
              chapterId={params.chapterId}
              completeOnEnd={false}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default videoPage;
