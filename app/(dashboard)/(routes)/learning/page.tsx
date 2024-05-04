import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { CoursesList } from "@/components/courses-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDashboardCourses } from "@/actions/get-dashboard-courses"

const CoursesPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  )

  return (
    <div className="flex flex-col items-center justify-center px-12 sm:px-24 py-16 ">
      <Tabs
        defaultValue="inProgress"
        className="w-full flex flex-col items-center gap-4 max-w-5xl"
      >
        <TabsList className="grid grid-cols-2 h-[44px] w-full mb-4">
          <TabsTrigger value="inProgress" className="h-full">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="Completed" className="h-full">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inProgress" className="w-full">
          <CoursesList items={coursesInProgress} />
        </TabsContent>
        <TabsContent value="Completed" className="w-full">
          <CoursesList items={completedCourses} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CoursesPage
