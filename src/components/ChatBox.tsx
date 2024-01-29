import React from "react"
import Image from "next/image"
import Search from "@/assets/search.svg"

const ChatBox: React.FC = () => {
  return (
    <div className="mx-10 relative">
      <input
        type="text"
        placeholder="Type your question here"
        className="w-full pr-20 py-5 px-7 text-base bg-white border-gray-300 focus:outline-none border-2 focus:border-primary rounded-md "
      />
      <Image
        src={Search}
        alt="search"
        width={32}
        height={32}
        className="absolute inset-y-1/4 right-7 rounded-md rounded-l-none cursor-pointer"
      />
    </div>
  )
}

export default ChatBox
