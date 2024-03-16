import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseHero from "./_components/course-hero";
import ChapterNavbar from "./_components/chapter-navbar";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
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

  if (!course) {
    return redirect("/");
  }
  if (course.chapters.length === 0) {
    return (
      <>
        <CourseHero
          courseName={course.title}
          courseDescription={course.description!}
          coursePicture={course.imageUrl!}
        />
        <ChapterNavbar course={course} />
      </>
    );
  }
  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CoursePage;
