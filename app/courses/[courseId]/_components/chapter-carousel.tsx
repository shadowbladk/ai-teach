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

interface ChapterCarouselProps {
  course: Course & {
    chapters: Chapter[];
  };
  onSelectChapter: (index: number) => void;
}

export const ChapterCarousel = ({
  course,
  onSelectChapter,
}: ChapterCarouselProps) => {
  return (
    <div>
      <Carousel className="flex-row max-w-[300px] md:max-w-[600px]">
        <CarouselContent>
          {course.chapters.map((chapter, index) => (
            <div className="p-1 md:p-3">
              <CarouselItem key={index} className="basis-1/3 md:basis-1/4">
                <Link
                  href={`/courses/${chapter.courseId}/chapters/${chapter.id}`}
                  className="text-2xl font-semibold"
                >
                  <Card className="w-[55px] h-[55px] rounded-full border-[3px] border-black">
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
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
