import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"

import { FreeMode, Pagination } from "swiper/modules"

import { Data } from "@/constants"
import Card from "./Card"

const Slider = () => {
  return (
    <div className="flex px-4">
      <Swiper
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
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-sm md:max-w-2xl xl:max-w-5xl"
      >
        {Data.map((item) => (
          <SwiperSlide key={item.title} className="max-w-fit">
            <div className="flex flex-col mx-20 mb-12 place-items-center group relative cursor-pointer">
              <Card />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider
