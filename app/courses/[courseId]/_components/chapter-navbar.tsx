"use client";
import { useState, useEffect } from "react";
import { Course, Chapter } from "@prisma/client";
import { Slider } from "./slider";
import { ChapterCarousel } from "./chapter-carousel";

interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

export const ChapterNavbar = ({ course }: ChapterNavbarProps) => {
  const [currentChapterTitle, setCurrentChapterTitle] = useState("");

  useEffect(() => {
    if (course.chapters.length > 0) {
      setCurrentChapterTitle(course.chapters[0].title);
    }
  }, [course.chapters]);

  const handleChapterClick = (title: string) => {
    setCurrentChapterTitle(title);
  };

  return (
    <div className="flex-col">
      <div className="flex justify-center p-6">
        <ChapterCarousel course={course} onSelectChapter={handleChapterClick} />
      </div>
      <div className="flex justify-center pb-6">
        <h1 className="text-2xl font-extrabold text-black text-center">
          {currentChapterTitle}
        </h1>
      </div>
    </div>
  );
};

export default ChapterNavbar;
