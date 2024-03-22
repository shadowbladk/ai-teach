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
        include: {
          documents: {
            orderBy: {
              createdAt: "asc",
            },
          },
          flashcarddecks: {
            orderBy: {
              createdAt: "asc",
            },
          },
          questions: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const initialChapterIndex = course!.chapters.findIndex(
    (ch) => ch.id === params.chapterId
  );

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
      <ChapterNavbar
        course={course}
        initialChapterIndex={initialChapterIndex}
      />
      <div className="w-full justify-center px-6">
        <div className="max-w-[720px] mx-auto flex flex-wrap justify-center">
          <ChapterBox />
        </div>
      </div>
    </>
  );
};
export default chapterIdPage;
