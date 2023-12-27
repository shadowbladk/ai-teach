import Image from "next/image"

import { useState } from "react"

import Profile from "@/assets/user.svg"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import Card from "@/components/Card"

// import Slider from "@/components/Slider2"

function profile() {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">
          <section className="min-h-[450px] flex flex-col justify-center py-16 px-12 sm:px-20 xl:px-28 ">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 justify-center items-center lg:items-start">
              <Image
                className="h-[200px] w-[200px] md:h-[240px] md:w-[240px]"
                src={Profile}
                alt={"Profile"}
              />
              <div className="flex flex-col items-center lg:items-start gap-4 max-w-[600px]">
                <h1 className="text-[32px] font-extrabold text-primary">
                  Mary Jane
                </h1>
                <p className="text-center lg:text-left">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Debitis in repudiandae dolore doloremque eaque nobis omnis
                  aliquam et fuga odio tenetur, dolores praesentium nulla
                  reiciendis nam assumenda distinctio nemo perspiciatis? Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit. Debitis in
                  repudiandae dolore doloremque e
                </p>
              </div>
            </div>
          </section>
          <section>
{/* <Slider /> */}
          </section>
          <section className="flex flex-col justify-center py-12 px-12 sm:px-20 xl:px-28 bg-white gap-8">
            
            <div className="mt-6 mb-10 flex flex-row justify-center">
              <button
                onClick={() => setToggle(true)}
                className={`flex flex-col justify-center items-center ${
                  toggle ? "opacity-100" : "opacity-50"
                }`}
              >
                <h2 className="text-2xl text-center text-primary font-semibold mb-2">
                  Enroll
                </h2>
                <div className="rounded-r-none rounded-l w-full bg-primary px-14 py-0.5 text-sm font-semibold text-white shadow-sm hover:opacity-50"></div>
              </button>
              <button
                onClick={() => setToggle(false)}
                className={`flex flex-col justify-center items-center ${
                  toggle ? "opacity-50" : "opacity-100"
                }`}
              >
                <h2 className="text-2xl text-center text-primary font-semibold mb-2">
                  Teaching
                </h2>
                <div className="rounded-l-none rounded-r w-full bg-primary px-16 py-0.5 text-sm font-semibold text-white shadow-sm hover:opacity-50"></div>
              </button>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-8 place-self-center lg:max-w-7xl lg:grid-cols-2 xl:grid-cols-3">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default profile
