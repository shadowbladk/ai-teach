import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Image from "next/image"

import HeroPic from "@/assets/hero.svg"
import Levelup from "@/assets/levelup.svg"
import Feedback from "@/assets/feedback.svg"
import Quiz from "@/assets/quiz.svg"

import Slider from "@/components/CourseSlider"

function quiz() {
    const [toggle, setToggle] = useState(false)
  
    return (
      <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">
          <section className="flex flex-col items-center justify-center px-23 py-16 gap-12">
            <h1 className="text-[32px] font-extrabold text-center text-black">
              Quiz
            </h1>
            <div className="flex flex-col w-full max-w-[900px] lg:flex-row items-center justify-between">
              <p className="text-[24px] font-extrabold text-left text-black">
                Quiz 1 - Review Chapter 1
              </p>
              <p className="text-[24px] font-extrabold text-right text-black">
                Question 1/10
              </p>
            </div>
            <div className="flex flex-col w-full max-w-[900px] py-6 gap-12">
            <h1 className="text-[32px] font-extrabold text-left text-black">
              Quiz
            </h1>
            </div>
          </section>
        </div>
        <Footer />
      </div>
      </>
    )
  }
  
  export default quiz