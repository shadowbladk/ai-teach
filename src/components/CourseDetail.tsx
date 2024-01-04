import CourseBox from "@/components/CourseBox";
import React from "react";
import quizicon from "@/assets/quiz-icon.svg";
import videoicon from "@/assets/video-icon.svg";
import fcicon from "@/assets/fc-icon.svg";
import readingicon from "@/assets/reading-icon.svg";

interface CourseData {
  coursedata: Array<{
    type: string;
    title: string;
    isLearn: boolean;
  }>;
}

const CourseDetail = ({ courseData }: { courseData: CourseData }) => {
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

  return (
    <>
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
    </>
  );
};

export default CourseDetail;
