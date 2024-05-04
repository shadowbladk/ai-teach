import Image from "next/image"

import ChatPic from "@/public/chat-pic.svg"

export const AIChatBox = ({AIText}: {AIText: string}) => {

  return (
    <div className="min-w-[330px] p-5 mr-14 gap-5 flex bg-[#4F46E5] rounded-md items-start self-start">
        <Image className="w-[32px] float-right" src={ChatPic} alt={"ChatPic"} />
        <p className="text-white self-center">{AIText}</p>
    </div>
  )
}

