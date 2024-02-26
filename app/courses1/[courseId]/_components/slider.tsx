"use client";

import React, { useEffect } from "react";
import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

import { ChevronsLeft, ChevronsRight, PlusCircle } from "lucide-react";

import { Category, Chapter, Course } from "@prisma/client";
import Link from "next/link";

interface SliderProps {
  course: Course & {
    chapters: Chapter[];
  };
  onChapterClick: (title: string) => void;
}

export const Slider = ({ course, onChapterClick }: SliderProps) => {
  const [lengthItems, setLengthItems] = useState(course.chapters.length);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(lengthItems > 3);

  const handleSlideChange = (swiper: any) => {
    setCanGoPrev(!swiper.isBeginning);
    setCanGoNext(!swiper.isEnd);
  };

  useEffect(() => {
    setLengthItems(course.chapters.length);
    setCanGoNext(course.chapters.length > 3);
  }, [course.chapters.length]);

  return (
    <div className="flex flex-row gap-4 sm:gap-8 items-baseline justify-center">
      <div className="custom-prev-button">
        {canGoPrev ? (
          <ChevronsLeft className="w-5 text-[#4F46E5]" />
        ) : (
          <ChevronsLeft className="w-5 text-[#94A3B8]" />
        )}
      </div>
      <div className="flex flex-row w-[140px] justify-center items-center">
        <Swiper
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          slidesPerView={lengthItems > 3 ? 3 : lengthItems}
          draggable={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
          }}
          modules={[FreeMode, Navigation, Pagination]}
          className="max-w-[300px] sm:max-w-sm lg:max-w-2xl xl:max-w-5xl"
        >
          {course.chapters.map((chapter, index) => (
            <SwiperSlide key={chapter.id} className="max-w-fit mb-15">
              <div className="flex flex-col mx-1 place-items-center group relative cursor-pointer">
                <Link
                  href={`/courses1/${chapter.courseId}/chapters1/${chapter.id}`}
                  className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full"
                  onClick={() => onChapterClick(chapter.title)}
                >
                  {index + 1}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="custom-next-button">
        {canGoNext ? (
          <ChevronsRight className="text-[#4F46E5]" />
        ) : (
          <ChevronsRight className="text-[#94A3B8]" />
        )}
      </div>
    </div>
  );
};

export default Slider;
