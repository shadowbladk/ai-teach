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
import LeftDisable from "@/assets/left-disable.svg"
import Right from "@/assets/right.svg"
import RightDisable from "@/assets/right-disable.svg"

const Slider = () => {
  const [canGoPrev, setCanGoPrev] = useState(false)
  const [canGoNext, setCanGoNext] = useState(true)

  const handleSlideChange = (swiper: any) => {
    const isBeginning = swiper.isBeginning
    const isEnd = swiper.isEnd

    if (isBeginning) {
      setCanGoPrev(false)
    } else if (isEnd) {
      setCanGoNext(false)
    } else {
      setCanGoPrev(true)
      setCanGoNext(true)
    }

    console.log(`isBeginning: ${isBeginning}, ${canGoPrev}, isEnd: ${isEnd}`)
  }

  return (
    <div className="flex flex-row gap-4 sm:gap-8 items-baseline justify-center">
      <div className="custom-prev-button h-full min-w-[40px] sm:min-w-[60px]">
        {canGoPrev ? (
          <Image src={Left} alt={""} />
        ) : (
          <Image src={LeftDisable} alt={""} />
        )}
      </div>
      <div className="flex flex-row justify-center items-center">
        <Swiper
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
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
          {Data.map((item) => (
            <SwiperSlide key={item.title} className="max-w-fit mb-16">
              <div className="flex flex-col mx-20 place-items-center group relative cursor-pointer">
                <Card />
              </div>
            </SwiperSlide>
          ))}
         </Swiper>   
      </div>
      <div className="custom-next-button h-full min-w-[40px] sm:min-w-[60px]">
      {canGoNext ? (
          <Image src={Right} alt={""} />
        ) : (
          <Image src={RightDisable} alt={""} />
        )}
      </div>
    </div>
  )
}

export default Slider
