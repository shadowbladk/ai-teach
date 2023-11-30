import Link from "next/link";
import Image from "next/image";

import quizicon from "@/assets/quiz-icon.svg";
import videoicon from "@/assets/video-icon.svg";
import fcicon from "@/assets/fc-icon.svg";
import readingicon from "@/assets/reading-icon.svg";

interface CourseHeroProps {
  courseName?: string;
  coursePicture: string;
  courseDescription?: string;
  reading?: number;
  video?: number;
  quiz?: number;
  flashcard?: number;
}

const CourseHero: React.FC<CourseHeroProps> = ({
  reading,
  video,
  quiz,
  flashcard,
  courseName,
  coursePicture,
  courseDescription,
}) => {
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
          <h1 className="text-2xl font-extrabold text-black ">{courseName}</h1>
          <div className="flex grid-rows-4 gap-5 md:flex-row">
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={readingicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">{reading}</p>
              <p className="text-sm font-semibold">Reading</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={quizicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">{video}</p>
              <p className="text-sm font-semibold">Video</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={videoicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">{quiz}</p>
              <p className="text-sm font-semibold">quizzes</p>
            </div>
            <div className="flex flex-col gap-1 items-center lg:gap-2 sm:flex-row">
              <Image src={fcicon} alt={"Python logo"} />
              <p className="text-sm font-semibold">{flashcard}</p>
              <p className="text-sm font-semibold">Flashcards</p>
            </div>
          </div>
          <p className="text-sm font-medium text-center lg:max-w-[720px] lg:text-base lg:text-start">
            {courseDescription}
          </p>
          <div className="w-full flex grid-row-2 gap-5 justify-center lg:justify-end">
            <Link href="/course-detail">
              <button className="rounded-lg bg-white max-h-10 px-6 py-1 border-2 border-primary text-xs font-semibold text-black lg:text-sm">
                Reviews
              </button>
            </Link>
            <Link href="/course-detail">
              <button className="rounded-lg bg-primary max-h-10 px-6 py-1 text-xs font-semibold text-white lg:text-sm">
                Enroll course
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseHero;
