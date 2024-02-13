"use client"

import React from "react"
import { useRef, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import { FreeMode, Pagination, Navigation } from "swiper/modules"

import { ChevronsLeft, ChevronsRight } from "lucide-react"

import { Category, Course } from "@prisma/client"

import { CourseCard } from "@/components/course-card"

type CourseWithProgressWithCategory = Course & {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

interface CoursesListProps {
  items: CourseWithProgressWithCategory[]
}

export const Slider = ({ items }: CoursesListProps) => {
  const [canGoPrev, setCanGoPrev] = useState(false)
  const [canGoNext, setCanGoNext] = useState(false)

  const handleSlideChange = (swiper: any) => {
    const isBeginning = swiper.isBeginning
    const isEnd = swiper.isEnd

    if (isBeginning) {
      setCanGoPrev(false)
      setCanGoNext(true)
    } else if (isEnd) {
      setCanGoNext(false)
      setCanGoPrev(true)
    } else {
      setCanGoPrev(true)
      setCanGoNext(true)
    }
  }

  return (
    <div className="flex flex-row gap-4 sm:gap-8 items-baseline justify-center">
      <div className="custom-prev-button">
        {canGoPrev ? (
          <ChevronsLeft className="h-10 sm:h-16 w-10 sm:w-16 text-[#4F46E5]" />
        ) : (
          <ChevronsLeft className="h-10 sm:h-16 w-10 sm:w-16 text-[#94A3B8]" />
        )}
      </div>
      <div className="flex flex-row justify-center items-center">
        <Swiper
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          slidesPerView={1}
          breakpoints={{
            // 640: {
            //   width: 384,
            // },
            1024: {
              slidesPerView: 2,
              width: 672,
            },
            1280: {
              slidesPerView: 3,
              width: 1042,
            },
          }}
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
          {items.map((item) => (
            <SwiperSlide key={item.title} className="max-w-fit mb-16">
              <div className="flex flex-col mx-20 place-items-center group relative cursor-pointer">
                <CourseCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl!}
                  chaptersLength={item.chapters.length}
                  price={item.price!}
                  progress={item.progress}
                  category={item?.category?.name!}
                  size="slider"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="custom-next-button">
        {canGoNext ? (
          <ChevronsRight className="h-10 sm:h-16 w-10 sm:w-16 text-[#4F46E5]" />
        ) : (
          <ChevronsRight className="h-10 sm:h-16 w-10 sm:w-16 text-[#94A3B8]" />
        )}
      </div>
    </div>
  )
}
