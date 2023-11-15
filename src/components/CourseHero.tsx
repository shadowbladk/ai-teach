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
        <div className="flex flex-col gap-6 lg:pl-6">
          <h1 className="text-4xl font-extrabold text-primary">EVENT HIVE</h1>
          <div className="flex flex-row">
            <Image src={readingicon} alt={"Python logo"} />
            <p className="text-lg"> 15 Reading</p>
            <Image src={quizicon} alt={"Python logo"} />
            <p className="text-lg"> 5 Video</p>
            <Image src={quizicon} alt={"Python logo"} />
            <Image src={quizicon} alt={"Python logo"} />
          </div>
          <p className="text-lg w-[740px]">
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
