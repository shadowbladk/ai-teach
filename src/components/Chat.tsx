import { useState, useEffect } from "react"

import Image from "next/image"

import Profile from "@/assets/profile-icon.svg"
import Close from "@/assets/close-chat.svg"
import Search from "@/assets/close-chat.svg"

import AIChatBox from "@/components/AIChatBox"
import ChatBox from "@/components/ChatBox"

const Chat = () => {
  const [chat, setChat] = useState(false)

  return (
    <>
      <div className="fixed z-20 bottom-[100px] right-[100px]">
        <button onClick={() => setChat(!chat)}>
          <Image className="w-[60px]" src={Profile} alt={"Profile"} />
        </button>
      </div>
      <div
        className={`bg-[#F3F4F4] shadow-md z-10 h-[650px] rounded-md w-[650px] ${
          chat ? "fixed bottom-[180px] right-[100px]" : "hidden"
        }`}
      >
        <div className="bg-white h-[60px] rounded-t-md flex flex-row items-center px-10">
          <h3 className="grow text-xl font-semibold">AI Chat</h3>
          <Image className="w-[16px]" src={Close} alt={"Close"} />
        </div>
        <div className="p-10 h-[495px] gap-5 flex flex-col overflow-y-scroll">
          <AIChatBox AIText="Welcome to the Ai Teach! What can I help you with?" />
        </div>
        <ChatBox />
        </div>
    </>
  )
}

export default Chat
