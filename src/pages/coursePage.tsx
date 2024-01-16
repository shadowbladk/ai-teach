import React, { useState } from "react";
import CourseHero from "@/components/CourseHero";
import CourseBox from "@/components/CourseBox";
import CourseDetail from "@/components/CourseDetail";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Python from "@/assets/python.svg";
import CourseReview from "@/components/CourseReview";

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("courseDetail");

  const handleReviewTabClick = () => {
    setActiveTab("review");
  };

  const handleCourseDetailTabClick = () => {
    setActiveTab("courseDetail");
  };
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-grow min-h-screen">
          <div>
            <CourseHero
              {...courseData}
              onReviewTabClick={handleReviewTabClick}
              onCourseDetailTabClick={handleCourseDetailTabClick}
            />
          </div>
          <div className="pb-16 flex flex-col h-full">
            {activeTab === "review" && (
              <div>
                <CourseReview />
              </div>
            )}
            {activeTab === "courseDetail" && (
              <div>
                <CourseDetail courseData={courseData} />
              </div>
            )}
          </div>
        </div>
        <Footer />
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
