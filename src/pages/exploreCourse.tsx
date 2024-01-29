import Image from "next/image"

import Find from "@/assets/find.svg"

import Card from "@/components/Card"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function ExploreCourse() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">
          <section className="flex flex-col justify-center items-center py-12 px-12 sm:px-20 xl:px-28 gap-8">
            <div className=" flex flex-row rounded-lg bg-primary p-1 max-h-[60px] w-full max-w-md lg:max-w-2xl xl:max-w-5xl">
              <input
                name="text"
                type="text"
                placeholder="Search Course"
                className="max-w input-bordered input w-full rounded-md rounded-r-none border-r-0 bg-white pl-4 outline-none"
              />
              <Image
                src={Find}
                alt="find"
                width={60}
                height={60}
                className="rounded-md rounded-l-none cursor-pointer"/>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-8 place-self-center lg:max-w-7xl lg:grid-cols-2 xl:grid-cols-3">
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

export default ExploreCourse
