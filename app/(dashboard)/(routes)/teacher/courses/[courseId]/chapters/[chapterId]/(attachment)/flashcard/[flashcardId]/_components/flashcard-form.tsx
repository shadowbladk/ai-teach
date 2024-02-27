"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Course } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FlashcardFrontCardForm } from "./flashcard-front-card-form"
import { flashcard } from "./mock-flashcard"

interface FlashcardFormProps {
  initialData: Chapter
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const FlashcardForm = ({
  initialData,
  courseId,
}: FlashcardFormProps) => {
  const [cards, setCards] = useState(flashcard)
  const [clickedCard, setClickedCard] = useState(0)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })

  // const handleQuestionAdd = () => {
  //   setCards([...cards, { frontside: "", backside: "" }])
  // }

  const handleQuestionRemove = (index: number) => {
    const items = [...cards]
    items.splice(index, 1)
    setCards(items)
  }

  return (
    <div className="flex flex-col-reverse items-center lg:items-start gap-8 lg:flex-row">
      <div className="flex flex-col gap-4 w-full max-w-sm lg:max-w-xs">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-medium">Card list</h3>
          <Button variant="underline" size="ghost">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
        <ScrollArea className="w-full h-[376px] rounded-md border">
          <div className="p-4 flex flex-col gap-4">
            {cards.map((card, index) => (
              <>
                <button
                  key={index}
                  className={`font-medium p-4 rounded-md ${
                    clickedCard === index
                      ? "bg-[#80489C]/90 text-white"
                      : "bg-slate-200"
                  }`}
                  onClick={(e) => setClickedCard(index)}
                >
                  {card.frontside}
                </button>
                {/* <Separator className="my-2" /> */}
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex w-full justify-center ">
        <Tabs
          defaultValue="front"
          className="w-full max-w-sm lg:max-w-md flex flex-col items-center"
        >
          <TabsList className="grid grid-cols-2 h-[44px] w-full">
            <TabsTrigger value="front" className="h-full">
              Front side
            </TabsTrigger>
            <TabsTrigger value="back" className="h-full">
              Back side
            </TabsTrigger>
          </TabsList>
          <TabsContent value="front" className="w-full">
            <FlashcardFrontCardForm initialData={cards[clickedCard]} />
          </TabsContent>
        </Tabs>
      </div>
      {/* <div>
          {cards.map((card, index) => (
          <>
            <FlashcardCardForm
              // key={index}
              initialData={initialData}
              courseId={courseId}
              // card={card}
            />
            <Button
              variant="warning"
              size="default"
              // onClick={(e) => handleQuestionRemove(index)}
            >
              Delete flashcard
            </Button>
            <hr className="border-t-2 rounded-md border-gray-400" />
          </>
          ))}
          <Button
            variant="primary"
            size="default"
            onClick={(e) => handleQuestionAdd()}
          >
            Add flashcard
          </Button>
        </div> */}
    </div>
  )
}
