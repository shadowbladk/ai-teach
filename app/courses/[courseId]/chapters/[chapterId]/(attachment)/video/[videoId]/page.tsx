import { db } from "@/lib/db";
import { VideoPlayer } from "./_components/video-player";
const videoPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <div className="flex-grow">
        <section className="flex flex-col w-screen items-center justify-center p-6">
          <h1 className="text-xl md:text-2xl font-extrabold text-black ">
            Keywords and Identifiers
          </h1>
          <div className="w-[700px] p-6 items-center">
            {/* <VideoPlayer
              playbackId={}
              courseId={}
              chapterId={}
              completeOnEnd={false}
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default videoPage;
