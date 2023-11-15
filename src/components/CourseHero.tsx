import Link from "next/link";
import Image from "next/image";

import Python from "@/assets/python.svg";
import quizicon from "@/assets/quiz-icon.svg";
import videoicon from "@/assets/video-icon.svg";
import fcicon from "@/assets/fc-icon.svg";
import readingicon from "@/assets/reading-icon.svg";

const CourseHero = () => {
  return (
    <div>
      <section className="flex flex-col-reverse items-center justify-center px-3 py-12 lg:flex-row bg-white">
        <div className="max-w-xs lg:max-w-md">
          <Image src={Python} alt={"Python logo"} />
        </div>
        <div className="flex flex-col gap-5 lg:pl-6">
          <h1 className="text-[32px] font-extrabold text-black">
            Python Bootcamp
          </h1>
          <div className="flex flex-row">
            <div className="flex flex-row items-center mr-5">
              <Image src={readingicon} alt={"Python logo"} />
              <p className="text-base font-bold ml-2.5">15 Reading</p>
            </div>
            <div className="flex flex-row items-center mr-5">
              <Image src={quizicon} alt={"Python logo"} />
              <p className="text-base font-bold ml-2.5"> 5 Video</p>
            </div>
            <div className="flex flex-row items-center mr-5">
              <Image src={videoicon} alt={"Python logo"} />
              <p className="text-base font-bold ml-2.5"> 5 Video</p>
            </div>
            <div className="flex flex-row items-center mr-5">
              <Image src={fcicon} alt={"Python logo"} />
              <p className="text-base font-bold ml-2.5"> 5 Video</p>
            </div>
          </div>
          <p className="text-lg w-[740px] font-medium">
            Python is a high-level, general-purpose programming language. Its
            design philosophy emphasizes code readability with the use of
            significant indentation. Python is dynamically typed and
            garbage-collected. It supports multiple programming paradigms,
            including structured, object-oriented and functional programming.{" "}
          </p>
        </div>
      </section>
    </div>
  );
};

export default CourseHero;
