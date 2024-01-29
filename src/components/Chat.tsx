import { useState, useEffect } from "react"

import Image from "next/image"

import Profile from "@/assets/profile-icon.svg"
import Close from "@/assets/close-chat.svg"
import Search from "@/assets/search.svg"

import AIChatBox from "@/components/AIChatBox"
import UserChatBox from "@/components/UserChatBox"

const Chat = () => {
  const [chat, setChat] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState("")
  let allMessages: string[] = messages

  const submit = async (e: any) => {
    // console.log(message)
    // console.log(messages)
    // console.log(allMessages)
    e.preventDefault()
    if (message === "") return
    allMessages.push(message)
    setMessages(allMessages)
    setMessage("")
  }

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
          <button onClick={() => setChat(!chat)}>
          <Image className="w-[16px]" src={Close} alt={"Close"} /></button>
        </div>
        <div className="p-10 h-[495px] gap-5 flex flex-col overflow-y-scroll">
          <AIChatBox AIText="Welcome to the Ai Teach! What can I help you with?" />
          {messages.map((message, index) => {
            return <UserChatBox key={index} UserText={message} />
          })}
        </div>
        <div className="mx-10 relative">
          <input
            type="text"
            placeholder="Type your question here"
            className="w-full pr-20 py-5 px-7 text-base bg-white border-gray-300 focus:outline-none border-2 focus:border-primary rounded-md "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { 
              if (e.key === "Enter") { 
                submit(e)
              }}}
          />
          <button onClick={submit}>
            <Image
              src={Search}
              alt="search"
              width={32}
              height={32}
              className="absolute inset-y-1/4 right-7 rounded-md rounded-l-none cursor-pointer"
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default Chat
