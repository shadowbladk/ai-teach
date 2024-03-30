"use client"

import * as z from "zod"
import axios, { all } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Course, Question } from "@prisma/client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { db } from "@/lib/db"

interface QuizAnswerFormProps {
  initialData: Question
  courseId: string
  chapterId: string
  questionsetId: string
}

interface ChoiceProps {
  value: string
  isCorrect: boolean
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const QuizAnswerForm = ({
  initialData,
  courseId,
  chapterId,
  questionsetId,
}:
QuizAnswerFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [question, setQuestion] = useState("")
  const [answers, setAnswers] = useState(Array.from({ length: 4 }, () => ""))
  const [correctAnswer, setCorrectAnswer] = useState<number>()
  const [allAnswers, setAllAnswers] = useState<ChoiceProps[]>([])

  const setDefaultAnswer = () => {
    allAnswers?.map((answer, index) => {
      answer.isCorrect ? setCorrectAnswer(index) : null
      updateAnswerAtIndex(index, answer.value)
    })
  }

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.text || "",
    },
  })

  

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    {
      answers.map((answer, index) =>
        index == Number(values.description)
          ? (allAnswers[index] = { value: answer, isCorrect: true })
          : (allAnswers[index] = { value: answer, isCorrect: false })
      )
    }
    setCorrectAnswer(Number(values.description))
    // try {
    //   await axios.patch(`/api/courses/${courseId}/attachment/quiz`, values)
    //   toast.success("Course updated")
    toggleEdit()
    //   router.refresh()
    // } catch {;
    //   toast.error("Something went wrong")
    // }
  }

  const updateAnswerAtIndex = (index: number, newValue: string) => {
    console.log(isSubmitting)
    setAnswers((prevItems) => {
      const updatedItems: string[] = [...prevItems]
      updatedItems[index] = newValue
      return updatedItems
    })
  }

  useEffect(() => {
    setDefaultAnswer()
  }, [])

  return (
    <div className="border bg-slate-100 rounded-md p-6 flex flex-col gap-4">
      <div className="font-medium flex justify-between">
        Question
        <Button
          onClick={toggleEdit}
          variant="underline"
          size="ghost"
          className={isEditing ? "hidden" : "flex"}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit question
        </Button>
      </div>

      {!isEditing && (
        <>
          <Form {...form}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <section className="flex flex-col gap-4">
                      <p
                        className={cn(
                          "text-sm",
                          !initialData.text && "text-slate-500 italic"
                        )}
                      >
                        {initialData.text || "No question"}
                      </p>
                      <div className="font-medium flex justify-between">
                        Answer
                      </div>
                      {allAnswers.length != 0 ? (
                        <RadioGroup
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                          disabled={true}
                        >
                          {allAnswers?.map((answer: any, index: any) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value={index}
                                  checked={answer.isCorrect}
                                />
                              </FormControl>
                              <p>{answer.value}</p>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      ) : (
                        <p className="text-sm text-slate-500 italic">
                          No answer
                        </p>
                      )}
                    </section>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <section className="flex flex-col gap-4">
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'Question... ?'"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                      <div className="font-medium flex justify-between">
                        Answer
                      </div>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={correctAnswer?.toString()}
                        className="flex flex-col space-y-1"
                      >
                        {answers.map((answer: any, index: number) => (
                          <div className="flex items-center space-x-3 space-y-0">
                            <div>
                              <RadioGroupItem value={String(index)} />
                            </div>
                            <Input
                              disabled={isSubmitting}
                              placeholder={`e.g. 'Choice ${index + 1}'`}
                              value={answers[index]}
                              onChange={(e) =>
                                updateAnswerAtIndex(index, e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </RadioGroup>
                    </section>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between pt-4">
              <Button
                // disabled={questions.length == 1}
                variant="warning"
                size="sm_l"
                // onClick={(e) => handleQuestionRemove(current)}
              >
                Delete
              </Button>
              <div className="flex justify-end gap-4">
                <Button
                  onClick={toggleEdit}
                  variant="underline"
                  size="ghost"
                  className={isEditing ? "flex" : "hidden"}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  size="sm_l"
                  variant="primary"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
