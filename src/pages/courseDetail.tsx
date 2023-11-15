import Link from "next/link";
import CourseHero from "@/components/CourseHero";
import Round from "@/components/Round";
import CourseBox from "@/components/CourseBox";

import quizicon from "@/assets/quiz-icon.svg";
import videoicon from "@/assets/video-icon.svg";
import fcicon from "@/assets/fc-icon.svg";
import readingicon from "@/assets/reading-icon.svg";

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function CourseDetail() {
  return (
    <>
      <div className="flex min-h-screen min-w-screen flex-col">
        <Navbar />
        <div className="flex min-w-screen">
          <CourseHero />
        </div>
        <div className="flex flex-row items-center justify-center mt-20">
          <div className="mx-10">
            <Round />
          </div>
          <div className="mx-10">
            <Round />
          </div>
          <div className="mx-10">
            <Round />
          </div>
        </div>
        <div className="pt-10">
          <h1 className="text-[32px] font-extrabold text-black text-center">
            Introduction
          </h1>
        </div>
        <div className="pt-10">
          <CourseBox
            imageUrl={videoicon}
            title="Introduction to Python"
            isLearn={true}
          />
          <CourseBox
            imageUrl={readingicon}
            title="Keywords and Identifiers"
            isLearn={true}
          />
          <CourseBox
            imageUrl={readingicon}
            title="Statements and Comment"
            isLearn={true}
          />
          <CourseBox
            imageUrl={readingicon}
            title="Python Variables"
            isLearn={false}
          />
          <CourseBox
            imageUrl={readingicon}
            title="Python Datatype"
            isLearn={true}
          />
          <CourseBox
            imageUrl={videoicon}
            title="Python Datatype"
            isLearn={true}
          />
          <CourseBox
            imageUrl={videoicon}
            title="Python Type Conversion"
            isLearn={false}
          />
          <CourseBox
            imageUrl={quizicon}
            title="Quiz 1 - Review Chapter 1"
            isLearn={true}
          />
          <CourseBox
            imageUrl={fcicon}
            title="Flashcard - Chapter 1"
            isLearn={true}
          />
        </div>
        <div className="mt-20">
        <Footer /></div>
      </div>
    </>
  );
}
