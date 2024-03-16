import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { CoursesList } from "@/components/courses-list"
import { getCoursesForInstructor } from "@/actions/get-courses-for-instuctor";

interface CoursesPageProps {
  searchParams: {
    isPublished: boolean;
  }
}

const CoursesPage = async ({ searchParams }: CoursesPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await getCoursesForInstructor({
    userId,
    ...searchParams,
  })

  console.log(courses);
  return (
    <div className="p-6">
      {/* <DataTable columns={columns} data={courses} /> */}
      <CoursesList items={courses} />
    </div>
  );
};

export default CoursesPage;
