"use client"

import * as z from "zod"
import axios, { all } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Course, Flashcard } from "@prisma/client"

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface FlashcardFrontCardFormProps {
  initialData: Flashcard
}

const formSchema = z.object({
  front: z.string().min(1),
})

export const FlashcardFrontCardForm = ({
  initialData,
}: FlashcardFrontCardFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [front, setFront] = useState(initialData?.front || "")

  const toggleEdit = () => {
    setIsEditing((current) => !current)
    setFront(initialData?.front || "")
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front: initialData?.front || "",
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

  return (
    <div className="bg-white border-[#80489C] w-full max-w-[440px] h-[280px] border-4 rounded-md p-6 flex flex-col gap-4 ">
      {!isEditing && (
        <>
          <div className="grow">
            <ScrollArea className="w-full h-full place-content-center grid">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="front"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={cn(
                            "text-2xl font-medium text-center",
                            !(front != "") && "text-lg text-slate-500 italic"
                          )}
                        >
                          {front || "No front side description"}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </ScrollArea>
          </div>
          <Button
            onClick={toggleEdit}
            variant="underline"
            size="ghost"
            className={isEditing ? "hidden" : "flex"}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col h-full"
          >
            <div className="grow">
              <FormField
                control={form.control}
                name="front"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormControl>
                      <Textarea
                        // defaultValue={initialData.front}
                        disabled={isSubmitting}
                        placeholder="e.g. 'Flash card'"
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                        className="h-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
