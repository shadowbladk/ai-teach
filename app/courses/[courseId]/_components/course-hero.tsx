import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import Link from "next/link";

interface CourseHeroProps {
  course: Course;
  userId: string | null;
}

const CourseHero = ({ course, userId }: CourseHeroProps) => {
  return (
    <div>
      <div className="flex flex-col w-screen items-center justify-center p-6 lg:flex-row bg-white">
        <div className="max-w-xs lg:max-w-md">
          <Image
            src={course.imageUrl!}
            alt={"${course.title} Image"}
            className="rounded-xl"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-5 items-center justify-center p-6 lg:items-start">
          <h1 className="text-xl font-extrabold text-blue md:text-2xl">
            {course.title}
          </h1>
          {/* <div className="flex grid-rows-4 gap-5 md:flex-row">
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={readingicon} alt={"Python logo"} />
              <p className="text-sm font-semibold"></p>
              <p className="text-sm font-semibold">Reading</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={quizicon} alt={"Python logo"} />
              <p className="text-sm font-semibold"></p>
              <p className="text-sm font-semibold">Video</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={videoicon} alt={"Python logo"} />
              <p className="text-sm font-semibold"></p>
              <p className="text-sm font-semibold">quizzes</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={fcicon} alt={"Python logo"} />
              <p className="text-sm font-semibold"></p>
              <p className="text-sm font-semibold">Flashcards</p>
            </div>
          </div> */}
          <p className="text-sm font-medium text-center lg:max-w-[720px] lg:text-base lg:text-start">
            {course.description!}
          </p>
          <div className="w-full flex grid-row-2 gap-5 justify-end">
            {userId === course.userId && (
              <Link href={`/teacher/edit/${course.id}`}>
                <Button variant="outline">Edit Course</Button>
              </Link>
            )}
            <Button variant="primary">Enroll course</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
