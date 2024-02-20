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

interface FlashcardCardFormProps {
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

export const FlashcardCardForm = ({
  initialData,
  courseId,
}: // allAnswers,
FlashcardCardFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [frontside, setFrontside] = useState("")
  const [backside, setBackside] = useState("")

  // const setDefaultAnswer = () => {
  //   allAnswers?.map((answer, index) => {
  //     answer.isCorrect ? setCorrectAnswer(index) : null
  //     updateAnswerAtIndex(index, answer.value)
  //   })
  // }

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // {
    //   answers.map((answer, index) =>
    //     index == Number(values.description)
    //       ? (allAnswers[index] = { value: answer, isCorrect: true })
    //       : (allAnswers[index] = { value: answer, isCorrect: false })
    //   )
    // }
    // setCorrectAnswer(Number(values.description))
    // try {
    //   await axios.patch(`/api/courses/${courseId}/attachment/quiz`, values)
    //   toast.success("Course updated")
    toggleEdit()
    //   router.refresh()
    // } catch {
    //   toast.error("Something went wrong")
    // }
  }


  // useEffect(() => {
  //   setDefaultAnswer()
  // }, [])

  return (
    <div className="border bg-slate-100 rounded-md p-6 flex flex-col gap-4 h-full">
      <div className="font-medium flex justify-between">
        Front side
        <Button
          onClick={toggleEdit}
          variant="underline"
          size="ghost"
          className={isEditing ? "hidden" : "flex"}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit flashcard
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
                          !initialData.description && "text-slate-500 italic"
                        )}
                      >
                        {initialData.description || "No front side description"}
                      </p>
                      <div className="font-medium flex justify-between">
                        Back side
                      </div>
                      <p
                        className={cn(
                          "text-sm",
                          !initialData.description && "text-slate-500 italic"
                        )}
                      >
                        {initialData.description || "No back side description"}
                      </p>
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
                        placeholder="e.g. 'Flash card'"
                        value={frontside}
                        onChange={(e) => setFrontside(e.target.value)}
                      />
                      <div className="font-medium flex justify-between">
                        Back side
                      </div>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'a card containing a small amount of information, held up for students to see, as an aid to learning.'"
                        value={backside}
                        onChange={(e) => setBackside(e.target.value)}
                      />
                    </section>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
      )}
    </div>
  )
}
