import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import CourseHero from "./_components/course-hero";
import ChapterNavbar from "./_components/chapter-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

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
          userProgress: {
            where: {
              userId,
            },
          },
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

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* <div className="h-[80px] fixed inset-y-0 w-full z-50"> */}
      <CourseNavbar course={course} progressCount={progressCount} />
      {/* </div> */}
      {/* <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div> */}
      <CourseHero
        courseName={course.title}
        courseDescription={course.description!}
        coursePicture={course.imageUrl!}
      />
      <ChapterNavbar course={course} />
      <main className="p-6 h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
