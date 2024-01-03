import Image from "next/image"

import HeroPic from "@/assets/hero.svg"
import Levelup from "@/assets/levelup.svg"
import Feedback from "@/assets/feedback.svg"
import Quiz from "@/assets/quiz.svg"

import Slider from "@/components/CourseSlider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">
          <section className="flex flex-col-reverse items-center justify-center px-4 py-24 gap-14 lg:flex-row">
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-[32px] font-extrabold text-primary">
                AI TEACH
              </h1>

              <h2 className="text-2xl font-medium">
                Explore course and level up your skill
              </h2>
              {/* <Link href="/register"> */}
              <div className="rounded-md border-primary border-2 px-11 py-2 text-base font-bold text-primary shadow-sm">
                Join Us
              </div>
              {/* </Link> */}
            </div>
            <div className="max-w-xs lg:max-w-md">
              <Image src={HeroPic} alt={"Hero Pic"} />
            </div>
          </section>

          <section className="flex flex-col items-center justify-center px-24 py-16 bg-white gap-12">
            <h1 className="text-[32px] font-extrabold text-center text-primary">
              Recommended Course
            </h1>
            <Slider />
          </section>
          <section className="flex flex-col items-center justify-center px-24 py-20 gap-12">
            <h1 className="text-[32px] font-extrabold text-center text-primary">
              Our Platform
            </h1>
            <div className="grid grid-cols-1 gap-12 md:gap-y-16 md:grid-cols-4 md:gap-x-32 lg:max-w-7xl lg:grid-cols-6 lg:gap-16 xl:gap-28">
              <div className="lg:grid-col items-center gap-8 hidden lg:col-span-2 lg:col-start-1 lg:mt-12 lg:grid">
                <h2 className="text-2xl text-center text-[#4B4B4B] font-semibold">
                  Level up your skill
                </h2>
                <Image className="w-[200px]" src={Levelup} alt={"Level up"} />
              </div>
              <div className="flex flex-col items-center gap-4 md:gap-8 md:col-span-2 md:col-start-2 md:justify-self-center lg:col-start-3">
                <h2 className="text-2xl text-center text-[#4B4B4B] font-semibold">
                  Give feedback <br /> on your assignment
                </h2>
                <Image
                  className="w-[160px] md:w-[200px]"
                  src={Feedback}
                  alt={"Feedback"}
                />
              </div>
              <div className="flex flex-col items-center gap-4 md:gap-8  md:col-span-2 lg:hidden ">
                <h2 className="text-2xl text-center text-[#4B4B4B] font-semibold">
                  Level up your skill
                </h2>
                <Image
                  className="w-[160px] md:w-[200px]"
                  src={Levelup}
                  alt={"Level up"}
                />
              </div>
              <div className="flex flex-col items-center gap-4 md:gap-8 md:col-span-2 lg:mt-12">
                <h2 className="text-2xl text-center text-[#4B4B4B] font-semibold">
                  Review with quiz
                </h2>
                <Image
                  className="w-[160px] md:w-[200px]"
                  src={Quiz}
                  alt={"Quiz"}
                />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
