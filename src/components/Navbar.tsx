import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import Menu from "@/assets/menu.svg"
import AITeach from "@/assets/aiteach.svg"
import Profile from "@/assets/profile-icon.svg"

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)

  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow">
      <div className="mx-auto px-8 py-5 md:flex md:items-center lg:max-w-7xl">
        <div className="flex md:grow">
          <Link href="/" className="grow">
            <Image className="h-10" src={AITeach} alt={"AITeach"} />
          </Link>

          <div className="flex items-center gap-4 md:hidden">
            <Link href="/profile">
              <Image className="w-8" src={Profile} alt={"Profile"} />
            </Link>
            <button onClick={() => setNavbar(!navbar)}>
              <Image className="w-6" src={Menu} alt={"menu"} />
            </button>
          </div>
        </div>
        <div
          className={`py-4 md:flex md:justify-center md:pt-0 md:pb-0 ${
            navbar ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center space-y-8 text-center md:flex md:space-x-12 md:space-y-0 ">
          <Link href="/exploreCourse">
            <li className="text-base font-semibold hover:text-secondary">
              Explore Course
            </li>
            </Link>

            <li className="text-base font-semibold hover:text-secondary">
              My Learning
            </li>
          </ul>
        </div>
        <Link href="/profile">
          <Image
            className="ml-12 w-8 hidden md:flex"
            src={Profile}
            alt={"Profile"}
          />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
