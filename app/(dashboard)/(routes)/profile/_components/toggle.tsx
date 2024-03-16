"use client"

import { Category, Course } from "@prisma/client"
import { useState } from "react"
import { CoursesList } from "@/components/courses-list"

type CourseWithProgressWithCategory = Course & {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

interface CoursesListProps {
  items: CourseWithProgressWithCategory[]
}

export const Toggle = ({ enrollCourses, teachingCourses }: any) => {
  const [toggle, setToggle] = useState(true)

  return (
    <>
      <div className="flex flex-row justify-center">
        <button
          onClick={() => setToggle(true)}
          className={`flex flex-col justify-center items-center ${
            toggle ? "opacity-100" : "opacity-50"
          }`}
        >
          <h2 className="text-2xl text-center text-primary font-semibold mb-2">
            Enroll
          </h2>
          <div className="rounded-r-none rounded-l w-full bg-primary px-14 py-0.5 text-sm font-semibold text-white shadow-sm hover:opacity-50"></div>
        </button>
        <button
          onClick={() => setToggle(false)}
          className={`flex flex-col justify-center items-center ${
            toggle ? "opacity-50" : "opacity-100"
          }`}
        >
          <h2 className="text-2xl text-center text-primary font-semibold mb-2">
            Teaching
          </h2>
          <div className="rounded-l-none rounded-r w-full bg-primary px-16 py-0.5 text-sm font-semibold text-white shadow-sm hover:opacity-50"></div>
        </button>
      </div>
      <div className="max-w-5xl w-full">
        {toggle ? (
          <CoursesList items={enrollCourses} />
        ) : (
          <CoursesList items={teachingCourses} isInstructor={true}/>
        )}
      </div>
    </>
  )
}
