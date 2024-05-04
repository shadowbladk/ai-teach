"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Chapter, Course } from "@prisma/client";
import * as z from "zod";
import { ChapterEdit } from "./chapter-edit";

interface ChapterCarouselProps {
  course: Course & {
    chapters: Chapter[];
  };
  onSelectChapter: (index: number) => void;
  selectedChapterIndex: number;
}

export const ChapterCarousel = ({
  course,
  onSelectChapter,
  selectedChapterIndex,
}: ChapterCarouselProps) => {
  return (
    <div>
      <Carousel className="flex-row max-w-[300px] md:max-w-[600px]">
        <CarouselContent>
          {course.chapters.map((chapter, index) => (
            <div className="pt-1" key={index}>
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4">
                <Link
                  href={`/teacher/edit/${chapter.courseId}/chapters/${chapter.id}`}
                  className="text-2xl font-semibold"
                >
                  <Card
                    className={`w-[55px] h-[55px] rounded-full border-[3px] ${
                      selectedChapterIndex === index
                        ? "border-[#4F46E5] text-[#4F46E5]"
                        : "border-slate-500 text-slate-500"
                    }`}
                  >
                    <CardContent
                      className="flex items-center justify-center p-2 "
                      onClick={() => onSelectChapter(index)}
                    >
                      {index + 1}
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            </div>
          ))}
          <div className="pl-3">
            <ChapterEdit course={course} />
          </div>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
