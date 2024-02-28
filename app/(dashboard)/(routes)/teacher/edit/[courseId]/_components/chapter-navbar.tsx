"use client"

import React, { useState } from "react";
import { Course, Chapter } from "@prisma/client";
import { Slider } from "./slider";
import { ChapterTitleForm } from "./chapter-title-form";

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
    <div className="flex-col">
      <div className="flex justify-center p-6">
        <Slider course={course} onSelectChapter={handleChapterChange} />
      </div>
      <div>
        {course.chapters.length > 0 ? (
          <ChapterTitleForm
            initialData={{ title: course.chapters[selectedChapterIndex].title }}
            courseId={course.id}
            chapterId={course.chapters[selectedChapterIndex].id}
          />
        ) : (
          <p>No chapters available</p>
        )}
      </div>
    </div>
  );
};

export default ChapterNavbar;
