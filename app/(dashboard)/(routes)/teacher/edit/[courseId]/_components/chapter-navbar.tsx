"use client";

import React, { useState } from "react";
import { Course, Chapter } from "@prisma/client";
import { ChapterTitleForm } from "./chapter-title-form";
import { ChaptersForm } from "./chapters-form";
import { Button } from "@/components/ui/button";
import { ChapterCarousel } from "./chapter-carousel";
import { ArrowUpDown } from "lucide-react";
import { ChapterEdit } from "./chapter-edit";


interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

export const ChapterNavbar = ({ course }: ChapterNavbarProps) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(true);

  const handleChapterChange = (index: number) => {
    setSelectedChapterIndex(index);
  };

  const toggleView = () => {
    setShowCarousel((prevState) => !prevState);
  };

  return (
    <div className="flex-col w-full justify-center px-12">
      <div className="mx-auto flex flex-wrap justify-center">
      {showCarousel ? (
          <ChapterCarousel
            course={course}
            onSelectChapter={handleChapterChange}
          />
        ) : (
          <ChaptersForm initialData={course} courseId={course.id} />
        )}
      </div>
      <div className="flex max-w-[720px] mx-auto p-3 justify-center">
        {/* <Button onClick={toggleView}>
          
          {showCarousel ? <ArrowUpDown /> : "Back"}
        </Button> */}
        <ChapterEdit course={course}/>
        </div>
      <div className="flex max-w-[720px] justify-between mx-auto pt-6">
      {course.chapters.length > 0 ? (
        <ChapterTitleForm
          initialData={course.chapters[selectedChapterIndex] ? { title: course.chapters[selectedChapterIndex].title } : { title: course.chapters[selectedChapterIndex - 1
          ].title }}
          courseId={course.id}
          chapterId={course.chapters[selectedChapterIndex]?.id}/>
          ) : (
        <p>No chapters available</p>
        )}
      </div>
    </div>
  );
};

export default ChapterNavbar;
