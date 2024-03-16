import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ChapterNavbar from "../../_components/chapter-navbar";
import CourseHero from "../../_components/course-hero";
import { ChapterBox } from "./_components/chapter-box";

const chapterIdPage = async ({
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

  if (!course) {
    return redirect("/");
  }
  return (
    <>
      <CourseHero
        courseName={course.title}
        courseDescription={course.description!}
        coursePicture={course.imageUrl!}
      />
      <ChapterNavbar course={course} />
      <div className="w-full justify-center px-6">
        <div className="max-w-[720px] mx-auto flex flex-wrap justify-center">
          <ChapterBox />
        </div>
      </div>
    </>
  );
};
export default chapterIdPage;
