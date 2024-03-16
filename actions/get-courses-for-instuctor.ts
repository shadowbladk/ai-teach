import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
  };

type GetCoursesForInstructor = {
  userId: string;
  isPublished?: boolean;
};

export const getCoursesForInstructor = async ({
  userId,
  isPublished,
}: GetCoursesForInstructor): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        userId,
        isPublished: isPublished,
      },
      include: {
        category: true,
        chapters: true,
      },
    });
    
    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {

          // const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: null,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES_FOR_INSTRUCTOR]", error);
    return [];
  }
};
