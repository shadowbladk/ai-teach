"use client";

import React, { useState } from "react";
import { Course, Chapter } from "@prisma/client";
import { ChapterCarousel } from "./chapter-carousel";
import { ChapterTitleForm } from "./chapter-title";

interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
  initialChapterIndex: number; // Add a prop for the initial chapter index
}

export const ChapterNavbar = ({
  course,
  initialChapterIndex,
}: ChapterNavbarProps) => {
  const [selectedChapterIndex, setSelectedChapterIndex] =
    useState(initialChapterIndex);

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
      <div className="flex max-w-[720px] justify-center mx-auto p-6">
        {course.chapters.length > 0 ? (
          <ChapterTitleForm
            initialData={{
              title: course.chapters[selectedChapterIndex]?.title,
            }}
          />
        ) : (
          <p>No chapters created</p>
        )}
      </div>
    </div>
  );
};

export default ChapterNavbar;
