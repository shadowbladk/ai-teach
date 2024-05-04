import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { SearchInput } from "@/components/search-input"
import { getCourses } from "@/actions/get-courses"
import { CoursesList } from "@/components/courses-list"

import { Categories } from "./_components/categories"

interface SearchPageProps {
  searchParams: {
    title: string
    categoryId: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const courses = await getCourses({
    userId,
    ...searchParams,
  })

  return (
    <>
      <section className="flex flex-col items-center justify-center px-24 py-16">
        <div className="max-w-5xl w-full flex flex-col gap-8">
          <SearchInput />
          <Categories items={categories} />
          <CoursesList items={courses} />
        </div>
      </section>
    </>
  )
}

export default SearchPage
