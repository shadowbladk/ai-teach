import { useState, useEffect } from "react"
import Draggable from "react-draggable"
// import Resizable from "./Resizable"
import { Resizable } from "re-resizable"

import Image from "next/image"

import AIChatBtn from "@/assets/ai-chat-btn.svg"
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
          <Image className="w-[60px]" src={AIChatBtn} alt={"AIChatBtn"} />
        </button>
      </div>
      <Draggable>
        <div
          className={`items-center justify-center bg-[#F3F4F4] shadow-md z-20 rounded-md ${
            chat ? "fixed  bottom-[180px] right-[100px]" : "hidden"
          }`}
        >
          <Resizable
            className="flex flex-col"
            defaultSize={{
              width: 500,
              height: 500,
            }}
            minHeight={500}
            minWidth={500}
          >
            <div className="bg-white w-full rounded-t-md flex flex-row items-center py-4 px-10 self-start">
              <h3 className="grow text-xl font-semibold">AI Chat</h3>
              <button onClick={() => setChat(!chat)}>
                <Image className="w-[16px]" src={Close} alt={"Close"} />
              </button>
            </div>

            <div className="grow px-10 pt-10 gap-5 flex flex-col overflow-y-scroll">
              <AIChatBox AIText="Welcome to the Ai Teach! What can I help you with?" />
              {messages.map((message, index) => {
                return <UserChatBox key={index} UserText={message} />
              })}
            </div>
            <div className="relative mx-10 mb-10 mt-5">
              <input
                type="text"
                placeholder="Type your question here"
                className="w-full pr-20 py-5 px-7 text-base bg-white border-gray-300 focus:outline-none border-2 focus:border-primary rounded-md "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submit(e)
                  }
                }}
              />
              <button onClick={submit}>
                <Image
                  src={Search}
                  alt="search"
                  width={32}
                  height={32}
                  className="absolute bottom-5 right-7 rounded-md rounded-l-none cursor-pointer"
                />
              </button>
            </div>
          </Resizable>
        </div>
      </Draggable>
    </>
  )
}

export default Chat
