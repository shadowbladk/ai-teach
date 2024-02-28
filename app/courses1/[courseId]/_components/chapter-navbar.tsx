"use client"
import { useState, useEffect } from "react";
import { Course, Chapter } from "@prisma/client";
import ChapterNavbarItem from "./chapter-navbar-item";

interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

const ChapterNavbar: React.FC<ChapterNavbarProps> = ({ course }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedChapterIndex(0);
  }, []);

  const handleChapterClick = (index: number) => {
    setSelectedChapterIndex(index);
  };

  return (
    <div className="flex-col">
      <div className="flex justify-center p-6">
        {course.chapters.map((chapter, index) => (
          <button key={chapter.id} onClick={() => handleChapterClick(index)}>
            <ChapterNavbarItem chapter={chapter} number={index + 1} />
          </button>
        ))}
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-extrabold text-black text-center">
          {selectedChapterIndex !== null && course.chapters[selectedChapterIndex].title}
        </h1>
      </div>
    </div>
  );
};

export default ChapterNavbar;

