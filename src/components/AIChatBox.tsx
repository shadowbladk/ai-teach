import { useState, useEffect } from "react"

import Image from "next/image"

import Profile from "@/assets/profile-icon.svg"
import Chat from "@/assets/chat-icon.svg"

const AIChatBox = ({AIText}: {AIText: string}) => {

  return (
    <div className="w-[480px] p-5 gap-5 flex bg-primary rounded-md items-start">
        <Image className="w-[32px] float-right" src={Chat} alt={"Chat"} />
        <p className="text-white self-center">{AIText}</p>
    </div>
  )
}

export default AIChatBox