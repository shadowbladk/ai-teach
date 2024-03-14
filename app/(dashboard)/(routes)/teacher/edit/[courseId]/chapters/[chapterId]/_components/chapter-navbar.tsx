"use client";

import React, { useState } from "react";
import { Course, Chapter } from "@prisma/client";
import { ChapterTitleForm } from "./chapter-title-form";
import { ChapterCarousel } from "./chapter-carousel";


interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

export const ChapterNavbar = ({ course }: ChapterNavbarProps) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const handleChapterChange = (index: number) => {
    setSelectedChapterIndex(index);
  };

  return (
    <div className="flex-col w-full justify-center px-12">
      <div className="mx-auto flex flex-wrap justify-center">
        <ChapterCarousel
          course={course}
          onSelectChapter={handleChapterChange}
        />
      </div>
      <div className="flex max-w-[720px] justify-between mx-auto pt-6">
      {course.chapters.length > 0 ? (
        <ChapterTitleForm
          initialData={course.chapters[selectedChapterIndex] ? { title: course.chapters[selectedChapterIndex].title } : { title: course.chapters[selectedChapterIndex - 1
          ].title }}
          courseId={course.id}
          chapterId={course.chapters[selectedChapterIndex]?.id}/>
          ) : (
        <p>No chapters created</p>
        )}
      </div>
    </div>
  );
};

export default ChapterNavbar;
