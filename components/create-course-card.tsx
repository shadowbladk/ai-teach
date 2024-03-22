import Link from "next/link"
import { Plus } from "lucide-react"

export const CreateCourseCard = () => {
  return (
    <Link href={`/teacher/create`}>
      <div className="w-full h-full min-h-[300px] sm:min-h-[260px] border rounded-lg p-3 flex flex-col place-content-center items-center gap-4 hover:border-[#4F46E5] hover:border-2">
        <Plus className="w-12 h-12 bg-[#4F46E5] outline-dashed outline-offset-4 outline-[#4F46E5] stroke-[3px] text-white p-2 rounded-full " />
        <div className="text-[#4F46E5] text-lg font-bold">
          Create New Course
        </div>
      </div>
    </Link>
  )
}
