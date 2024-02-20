"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Course } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FlashcardCardForm } from "./flashcard-card-form"
import { flashcard } from "./mock-flashcard"

interface FlashcardFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const FlashcardForm = ({ initialData, courseId }: FlashcardFormProps) => {
  const [cards, setCards] = useState(flashcard)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })

  const handleQuestionAdd = () => {
    setCards([...cards, { frontside: "", backside: "" }])
  }

  const handleQuestionRemove = (index: number) => {
    const items = [...cards]
    items.splice(index, 1)
    setCards(items)
  }

  return (
    <>
      {cards.map((card, index) => (
        <>
          <FlashcardCardForm
            key={index}
            initialData={initialData}
            courseId={courseId}
            // card={card}
          />
          <Button
            variant="warning"
            size="default"
            onClick={(e) => handleQuestionRemove(index)}
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
    </>
  )
}
