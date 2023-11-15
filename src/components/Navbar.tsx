import Image from "next/image"
import Link from "next/link"
import AITeach from "../assets/aiteach.svg"
import Profile from "../assets/profile-icon.svg"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow">
      <div className="justify-stretch mx-auto px-10 py-5 md:flex md:items-center lg:max-w-7xl">
        
        <div className="flex flex-row flex-grow justify-start">
          <Link href="/" ><Image className="h-10" src={AITeach} alt={"AITeach"} /></Link>
        </div>
        

        <div className="flex flex-row gap-10">
          <button className="text-base font-semibold">Explore Course</button>
          <button className="text-base font-semibold">My Learning</button>
          <Image className="h-10" src={Profile} alt={"Profile"} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
