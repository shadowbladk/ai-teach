import Image from "next/image"

import AITeach from "@/assets/aiteach-white.svg"
import Profile from "@/assets/profile-icon.svg"

const Navbar = () => {
  return (
    <nav className="w-full bg-[#4B4B4B] shadow">
      <div className="justify-stretch mx-auto px-10 py-5 md:flex md:items-center lg:max-w-7xl">
        {/* <Link href="/" className="w-48 grow"> */}
        <div className="flex flex-row flex-grow justify-center items-center">
          <Image src={AITeach} alt={"AITeach"} />
          <p className="text-white text-xs ml-2">© 2023 </p>
        </div>
        {/* </Link> */}

        
      </div>
    </nav>
  )
}

export default Navbar