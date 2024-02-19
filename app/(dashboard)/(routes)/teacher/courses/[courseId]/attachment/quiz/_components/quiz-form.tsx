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
import { QuizAnswerForm } from "./quiz-answer-form"
import { quiz } from "./mock-answer"

interface QuizFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const QuizForm = ({ initialData, courseId }: QuizFormProps) => {
  const [questions, setQuestions] = useState(quiz)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })

  const handleQuestionAdd = () => { 
    setQuestions([...questions, { question: "", choices: [] }])
  }

  return (
    <>
      {questions.map((question, index) => (
        <QuizAnswerForm key={index} initialData={initialData} courseId={courseId} />
      ))}
      <Button variant="default" size="default" onClick={(e) => handleQuestionAdd()}>
        Add question
      </Button>
    </>
  )
}
