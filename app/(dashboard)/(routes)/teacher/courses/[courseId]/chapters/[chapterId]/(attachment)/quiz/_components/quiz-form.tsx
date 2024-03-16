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
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { QuizAnswerForm } from "./quiz-answer-form"
import { quiz } from "./mock-quiz"
import { QuizQuestionForm } from "./quiz-question-form"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import React from "react"

interface QuizFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const QuizForm = ({ initialData, courseId }: QuizFormProps) => {
  const [questions, setQuestions] = useState(quiz)

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })

  const handleQuestionAdd = () => {
    setCurrent(count + 1)
    setCount(count + 1)
    setQuestions([...questions, { question: "", choices: [] }])
  }

  const handleQuestionRemove = (index: number) => {
    console.log(index)
    // const items = [...questions]
    // items.splice(index, 1)
    // setQuestions(items)
  }

  return (
    <div className="w-4/5 flex flex-col self-center gap-8">
      <div className="flex flex-col gap-4 justify-between md:grid md:grid-cols-3">
        <div className="text-center text-xl col-start-1 md:col-start-2">
          Question {current} of {count}
        </div>
        <Button
          onClick={(e) => handleQuestionAdd()}
          variant="underline"
          size="ghost"
          className="justify-self-end col-start-3"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add new question
        </Button>
      </div>
      <Carousel setApi={setApi} className="w-full ">
        <CarouselContent>
          {questions.map((question, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col gap-4">
                <QuizAnswerForm
                  key={index}
                  initialData={initialData}
                  courseId={courseId}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
