import Image from "next/image"

import Profile from "@/assets/user.svg"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
// import Slider from "@/components/Slider2"

function profile() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">
          <section className=" bg-white min-h-[450px] flex flex-col justify-center py-16 px-12 sm:px-20 xl:px-28 ">
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
          <div className="w-fit flex flex-row justify-center bg-white">
            {/* <Slider /> */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default profile
