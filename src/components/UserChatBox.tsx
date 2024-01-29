import { useState, useEffect } from "react"

import Image from "next/image"

import Profile from "@/assets/profile-icon.svg"
import Chat from "@/assets/chat-icon.svg"

const UserChatBox = ({UserText}: {UserText: string}) => {

  return (
    <div className="w-fit max-w-[480px] p-5 gap-5 flex bg-white border-2 border-primary rounded-md justify-end self-end">
        <p className="self-center text-center">{UserText}</p>
    </div>
  )
}

export default UserChatBox