import Link from "next/link";
import CourseHero from "@/components/CourseHero";
import Round from "@/components/Round";
import CourseBox from "@/components/CourseBox";

import quizicon from "@/assets/quiz-icon.svg";
import videoicon from "@/assets/video-icon.svg";
import fcicon from "@/assets/fc-icon.svg";
import readingicon from "@/assets/reading-icon.svg";
import Python from "@/assets/python.svg";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetail() {
  const getIconUrl = (type: any) => {
    switch (type) {
      case "video":
        return videoicon;
      case "reading":
        return readingicon;
      case "quiz":
        return quizicon;
      case "flashcard":
        return fcicon;
      default:
        return;
    }
  };
  const uniqueSections = Array.from(
    new Set(courseData.coursedata.map((item) => item.section))
  );
  return (
    <>
      <div className="flex flex-col w-screen">
        <Navbar />
        <div className="flex w-screen">
          <CourseHero {...courseData} />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-black text-center">
            Introduction
          </h1>
        </div>
        <></>
        <div className="w-full justify-center px-6">
          <div className="max-w-[720px] mx-auto flex flex-wrap justify-center">
            {courseData.coursedata.map((course, index) => (
              <CourseBox
                key={index}
                imageUrl={getIconUrl(course.type)}
                title={course.title}
                isLearn={course.isLearn}
              />
            ))}
          </div>
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}

const courseData = {
  courseName: "Python Bootcamp",
  coursePicture: Python,
  courseDescription:
    "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming. ",
  reading: 15,
  video: 5,
  quiz: 3,
  flashcard: 3,
  coursedata: [
    {
      section: "Introduction",
      type: "video",
      title: "Introduction to Python",
      isLearn: true,
    },
    {
      section: "Introduction",
      type: "reading",
      title: "Keywords and Identifiers",
      isLearn: true,
    },
    {
      section: "Introduction",
      type: "reading",
      title: "Statements and Comment",
      isLearn: true,
    },
    {
      section: "Introduction",
      type: "reading",
      title: "Python Variables",
      isLearn: false,
    },
    {
      section: "Review",
      type: "reading",
      title: "Python Datatype",
      isLearn: true,
    },
    {
      section: "Review",
      type: "video",
      title: "Python Datatype",
      isLearn: true,
    },
    {
      section: "Review",
      type: "video",
      title: "Python Type Conversion",
      isLearn: false,
    },
    {
      section: "Review",
      type: "quiz",
      title: "Quiz 1 - Review Chapter 1",
      isLearn: true,
    },
    {
      section: "Review",
      type: "flashcard",
      title: "Flashcard - Chapter 1",
      isLearn: true,
    },
  ],
};
