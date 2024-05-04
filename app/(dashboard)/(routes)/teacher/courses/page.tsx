import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { CoursesList } from "@/components/courses-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCoursesForInstructor } from "@/actions/get-courses-for-instuctor"

const CoursesPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const publishCourses = await getCoursesForInstructor({
    userId,
    isPublished: true,
  })
  const unpublishCourses = await getCoursesForInstructor({
    userId,
    isPublished: false,
  })

  return (
    <div className="flex flex-col items-center justify-center px-12 sm:px-24 py-16 ">
      <Tabs
        defaultValue="publish"
        className="w-full flex flex-col items-center gap-4 max-w-5xl"
      >
        <TabsList className="grid grid-cols-2 h-[44px] w-full mb-4">
          <TabsTrigger value="publish" className="h-full">
            Published Courses
          </TabsTrigger>
          <TabsTrigger value="unpublish" className="h-full">
            Unpublished Courses
          </TabsTrigger>
        </TabsList>
        <TabsContent value="publish" className="w-full">
          <CoursesList items={publishCourses} isInstructor={true} />
        </TabsContent>
        <TabsContent value="unpublish" className="w-full">
          <CoursesList items={unpublishCourses} isInstructor={true} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CoursesPage
