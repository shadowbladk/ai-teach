import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { CheckCircle, Clock } from "lucide-react"

import { getDashboardCourses } from "@/actions/get-dashboard-courses"
import { getCoursesForInstructor } from "@/actions/get-courses-for-instuctor"

import { InfoCard } from "./_components/info-card"
import { Toggle } from "./_components/toggle"

import Image from "next/image"
import Profile from "./_components/user.svg"

export default async function Dashboard() {
  const { userId } = auth()
  const user = await currentUser()
  const img = user?.imageUrl
  // console.log(user?.firstName)
  // console.log(user?.lastName)
  // console.log(user?.imageUrl)
  if (!userId || !user) {
    return redirect("/")
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  )

  const teachingCourses = await getCoursesForInstructor({
    userId,
    isPublished: undefined,
  })

  return (
    <>
      <section className="flex flex-col-reverse items-center bg-[#F3F4F4] justify-center px-12 py-24 gap-4 lg:gap-14 lg:flex-row">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 justify-center items-center lg:items-start">
          <img
            // className="h-[200px] w-[200px] md:h-[240px] md:w-[240px]"
            className="rounded-full"
            width={200}
            height={200}
            src={img ? img : Profile}
            alt={"Profile"}
          />
          <div className="flex flex-col items-center lg:items-start gap-4 max-w-[600px]">
            <h1 className="text-[32px] font-extrabold text-primary">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-center lg:text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              in repudiandae dolore doloremque eaque nobis omnis aliquam et fuga
              odio tenetur, dolores praesentium nulla reiciendis nam assumenda
              distinctio nemo perspiciatis? Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Debitis in repudiandae dolore
              doloremque e
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center px-12 py-20 gap-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 max-w-4xl">
          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedCourses.length}
            variant="success"
          />
        </div>
        <Toggle
          enrollCourses={[...coursesInProgress, ...completedCourses]}
          teachingCourses={teachingCourses}
        />
      </section>
    </>
  )
}
