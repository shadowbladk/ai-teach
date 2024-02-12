"use client"

import { useState, useRef } from "react"
import Draggable from "react-draggable"
import { Resizable } from "re-resizable"

import { X, Send, Bot } from "lucide-react"

import { AIChatBox } from "@/components/chat-ai"
import { UserChatBox } from "@/components/chat-user"

interface ChatProps {
  text: string
  type: string
}

export const Chat = () => {
  const [chat, setChat] = useState(false)
  const [messages, setMessages] = useState<ChatProps[]>([])
  const [message, setMessage] = useState<ChatProps>({ text: "", type: "" })
  let allMessages: ChatProps[] = messages

  const chatRef = useRef<null | HTMLDivElement>(null)

  const submit = async (e: any) => {
    e.preventDefault()
    if (message?.text === "") return
    allMessages.push(message)
    setMessages(allMessages)
    setMessage({ text: "", type: "" })
    setTimeout(() => {
      chatRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }, 100)
  }

  return (
    <>
      <div className="fixed z-20 bottom-[100px] right-[100px]">
        <Bot
          className="w-14 h-14 bg-[#4F46E5] drop-shadow-xl text-white p-3 rounded-full"
          onClick={() => setChat(!chat)}
        />
      </div>
      <Draggable>
        <div
          className={`items-center justify-center bg-[#F3F4F4] shadow-md z-20 rounded-md ${
            chat
              ? "fixed bottom-[180px] right-[20px] lg:right-[100px]"
              : "hidden"
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
              <X onClick={() => setChat(!chat)} />
            </div>
            <div className="grow px-10 pt-10 overflow-y-scroll">
              <div className="gap-5 flex flex-col" ref={chatRef}>
                <AIChatBox AIText="Welcome to the Ai Teach! What can I help you with?" />
                {messages.map((message, index) => {
                  if (message.type === "ai") {
                    return <AIChatBox key={index} AIText={message.text} />
                  }
                  return <UserChatBox key={index} UserText={message.text} />
                })}
              </div>
            </div>
            <div className="relative mx-10 mb-10 mt-5">
              <input
                type="text"
                placeholder="Type your question here"
                className="w-full pr-20 py-5 px-7 text-base bg-white border-gray-300 focus:outline-none border-2 focus:border-[#4F46E5] rounded-md "
                value={message?.text}
                onChange={(e) =>
                  setMessage({ text: e.target.value, type: "user" })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submit(e)
                  }
                }}
              />
              <Send
                className="w-7 h-7 absolute bottom-5 right-7 text-[#4F46E5]"
                onClick={submit}
              />
            </div>
          </Resizable>
        </div>
      </Draggable>
    </>
  )
}
