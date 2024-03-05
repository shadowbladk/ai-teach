"use client";

import React, { useState } from "react";
import { Course, Chapter } from "@prisma/client";
import { Slider } from "./slider";
import { ChapterTitleForm } from "./chapter-title-form";
import { ChaptersForm } from "./chapters-form";
import { Button } from "@/components/ui/button";
import { ChapterCarousel } from "./chapter-carousel";
interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

export const ChapterNavbar = ({ course }: ChapterNavbarProps) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [isRearranging, setIsRearranging] = useState(false);

  const handleChapterChange = (index: number) => {
    setSelectedChapterIndex(index);
  };

  return (
    <div className="flex-col w-full justify-center px-12">
      <div className="mx-auto flex flex-wrap justify-center">
        <ChapterCarousel />
        {/* <Slider course={course} onSelectChapter={handleChapterChange} /> */}
      </div>
      <div className="max-w-[720px] justify-center mx-auto pt-6">
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
