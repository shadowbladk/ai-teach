import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import "swiper/css/navigation"

import { FreeMode, Pagination, Navigation } from "swiper/modules"

import { Data } from "@/constants"
import Card from "./Card"

import { useRef, useState } from "react"

import Image from "next/image"

import Left from "@/assets/left.svg"
import Right from "@/assets/right.svg"

const Slider = () => {
  const [canGoPrev, setCanGoPrev] = useState(true)
  const [canGoNext, setCanGoNext] = useState(true)

  const swiperRef = useRef<SwiperCore | null>(null)

  const handleSlideChangeTransitionEnd = () => {
    if (swiperRef.current) {
      setCanGoPrev(swiperRef.current.isBeginning)
      setCanGoNext(swiperRef.current.isEnd)

      console.log("canGoPrev:", canGoPrev)
    }
  }

  return (
    <div className="flex flex-row gap-8 items-center justify-center py-16 px-12 sm:px-20 xl:px-28 ">
      <div className="custom-prev-button h-full">
        {!canGoPrev ? (
          <Image src={Right} alt={""} />
        ) : (
          <Image src={Left} alt={""} />
        )}
      </div>
      <div className="flex flex-row justify-center items-center">
      <Swiper
        ref={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        draggable={true}
        freeMode={true}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={{
          nextEl: ".custom-next-button",
          prevEl: ".custom-prev-button",
        }}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        modules={[FreeMode, Navigation]}
        className="max-w-sm md:max-w-2xl xl:max-w-5xl"
      >
        {Data.map((item) => (
          <SwiperSlide key={item.title} className="max-w-fit">
            <div className="flex flex-col mx-20 mb-12 place-items-center group relative cursor-pointer">
              <Card />
            </div>
          </SwiperSlide>
        ))}
      </Swiper></div>
      <div className="custom-next-button h-full">
        <Image src={Right} alt={""} />
      </div>
    </div>
  )
}

export default Slider
