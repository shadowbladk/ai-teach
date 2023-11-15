import Link from "next/link"
import Image from "next/image"

import HeroPic from "../assets/hero.svg"
import Levelup from "../assets/levelup.svg"
import Feedback from "../assets/feedback.svg"
import Quiz from "../assets/quiz.svg"

import Card from "../component/Card"

function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow">
          <section className="flex flex-col-reverse items-center justify-center px-60 py-24 gap-14 lg:flex-row">
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

          <section className="flex flex-col items-center justify-center px-24 py-20 bg-white gap-14">
            <h1 className="text-[32px] font-extrabold text-primary">
              Recommended Course
            </h1>

            <Card />
          </section>
          <section className="flex flex-col items-center justify-center px-24 py-20 gap-14">
            <h1 className="text-[32px] font-extrabold text-primary">
              Our Platform
            </h1>
            <div className="flex flex-row items-center gap-28">
              <div className="flex flex-col items-center gap-8">
                <h2 className="text-2xl text-[#4B4B4B] font-semibold">
                  Level up your skill
                </h2>
                <Image className="w-[200px]" src={Levelup} alt={"Level up"} />
              </div>
              <div className="flex flex-col items-center gap-8">
                <h2 className="text-2xl text-center text-[#4B4B4B] font-semibold">
                  Give feedback <br/> on your assignment
                </h2>
                <Image className="w-[200px]" src={Feedback} alt={"Feedback"} />
              </div>
              <div className="flex flex-col items-center gap-8">
                <h2 className="text-2xl text-[#4B4B4B] font-semibold">
                  Review with quiz
                </h2>
                <Image className="w-[200px]" src={Quiz} alt={"Quiz"} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
