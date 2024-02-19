"use client"

import * as z from "zod"
import axios, { all } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Course } from "@prisma/client"

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

interface QuizAnswerFormProps {
  initialData: Course
  courseId: string
  // allAnswers: ChoiceProps[] | null
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
}: // allAnswers,
QuizAnswerFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [answers, setAnswers] = useState(Array.from({ length: 4 }, () => ""))
  const [correctAnswer, setCorrectAnswer] = useState<number>()
  const [allAnswers, setAllAnswers] = useState<ChoiceProps[]>([
    {
      value: "choice1",
      isCorrect: true,
    },
    {
      value: "choice2",
      isCorrect: false,
    },
    {
      value: "",
      isCorrect: false,
    },
    {
      value: "choice4",
      isCorrect: false,
    },
  ])

  const setDefaultAnswer = () => {
    allAnswers?.map((answer, index) => {
      answer.isCorrect ? setCorrectAnswer(index) : null
      updateAnswerAtIndex(index, answer.value)
    })
  }

  const toggleEdit = () => {
    setIsEditing((current) => !current)
    console.log(allAnswers)
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.description)
    console.log(answers)
    console.log(allAnswers)
    setAllAnswers([])
    console.log(allAnswers)
    {
      answers.map((answer, index) =>
        index == Number(values.description)
          ? allAnswers.push({ value: answer, isCorrect: true })
          : allAnswers.push({ value: answer, isCorrect: false })
      )
    }

    // try {
    //   await axios.patch(`/api/courses/${courseId}/attachment/quiz`, values)
    //   toast.success("Course updated")
    // setCorrectAnswer(field.value)
    toggleEdit()
    //   router.refresh()
    // } catch {
    //   toast.error("Something went wrong")
    // }
  }

  const updateAnswerAtIndex = (index: number, newValue: string) => {
    setAnswers((prevItems) => {
      // Create a copy of the original array
      const updatedItems: string[] = [...prevItems]
      // Update the value at the specified index
      updatedItems[index] = newValue
      // Return the updated array
      return updatedItems
    })
  }

  useEffect(() => {
    setDefaultAnswer()
  }, [])

  return (
    <div className="border bg-slate-100 rounded-md p-6 flex flex-col gap-4 h-full">
      <div className="font-medium flex justify-between">
        Answer
        <Button onClick={toggleEdit} variant="ghost" size="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit answer
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (allAnswers ? (
          <>
            <Form {...form}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                        disabled={true}
                      >
                        {allAnswers.map((answer: any, index: any) => (
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </>
        ) : (
          <p className="text-sm text-slate-500 italic">No answer</p>
        ))}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={correctAnswer?.toString()}
                      className="flex flex-col space-y-1"
                    >
                      {answers.map((answer: any, index: number) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={String(index)} />
                          </FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder={`e.g. 'Choice ${index + 1}'`}
                            // defaultValue={answer.value}
                            value={answers[index]}
                            onChange={(e) =>
                              updateAnswerAtIndex(index, e.target.value)
                            }
                          />
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
