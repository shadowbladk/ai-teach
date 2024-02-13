import Image from "next/image";
import { Button } from "@/components/ui/button";

import quizicon from "@/assets/quiz-icon.svg";
import videoicon from "@/assets/video-icon.svg";
import fcicon from "@/assets/fc-icon.svg";
import readingicon from "@/assets/reading-icon.svg";

interface CourseHeroProps {
  courseName: string;
  coursePicture: string;
  courseDescription: string;
}

const CourseHero = ({
  courseName,
  coursePicture,
  courseDescription,
}: CourseHeroProps) => {
  return (
    <div>
      <section className="flex flex-col w-screen items-center justify-center p-6 lg:flex-row bg-white">
        <div className="max-w-xs lg:max-w-md">
          {coursePicture && (
            <Image
              src={coursePicture}
              alt={"${courseName} Image"}
              className="rounded-full"
              width={150}
              height={150}
            />
          )}
        </div>
        <div className="flex flex-col gap-5 items-center justify-center lg:px-6 lg:items-start">
          <h1 className="text-xl font-extrabold text-black md:text-2xl">
            {courseName}
          </h1>
          <div className="flex grid-rows-4 gap-5 md:flex-row">
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={readingicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">Reading</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={quizicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">Video</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={videoicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">quizzes</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={fcicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">Flashcards</p>
            </div>
          </div>
          <p className="text-sm font-medium text-center lg:max-w-[720px] lg:text-base lg:text-start">
            {courseDescription}
          </p>
          <div className="w-full flex grid-row-2 gap-5 justify-center lg:justify-end">
            <Button variant="default">Enroll course</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseHero;
