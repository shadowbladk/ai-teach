"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Course, Flashcard } from "@prisma/client"
import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { FlashcardFrontCardForm } from "./flashcard-front-card-form"
import { flashcard } from "./mock-flashcard"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

interface FlashcardFormProps {
  initialData: Flashcard[]
}

const formSchema = z.object({
  front: z.string(),
})

export const FlashcardForm = ({ initialData }: FlashcardFormProps) => {
  const [cards, setCards] = useState(initialData)
  const [clickedCard, setClickedCard] = useState(0)
  const [front, setFront] = useState(cards[clickedCard].front || "")
  const [back, setBack] = useState(cards[clickedCard].back || "")
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()

  const toggleEdit = () => {
    setIsEditing((current) => !current)
    setFront(cards[clickedCard].front || "")
  }

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     description: initialData?.description || "",
  //   },
  // })

  // const handleQuestionAdd = () => {
  //   setCards([...cards, { frontside: "", backside: "" }])
  // }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      front: cards[clickedCard].front || "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
        <ScrollArea className="w-full h-[384px] rounded-md border">
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
                  onClick={(e) => {
                    setClickedCard(index)
                    setFront(cards[index].front!)
                    setBack(cards[index].back!)
                  }}
                >
                  {card.front}
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
          className="w-full max-w-sm lg:max-w-md flex flex-col items-center gap-4"
        >
          <TabsList className="grid grid-cols-2 h-[44px] w-full mb-4">
            <TabsTrigger value="front" className="h-full">
              Front side
            </TabsTrigger>
            <TabsTrigger value="back" className="h-full">
              Back side
            </TabsTrigger>
          </TabsList>
          <>
            {!isEditing && (
              <>
                <div className="bg-white border-[#80489C] w-full max-w-[440px] h-[280px] border-4 rounded-md p-6">
                  <ScrollArea className="w-full h-full place-content-center grid">
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="front"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <>
                                <TabsContent value="front" className="w-full">
                                  <div
                                    className={cn(
                                      "text-2xl font-medium text-center",
                                      !(front != "") &&
                                        "text-lg text-slate-500 italic"
                                    )}
                                  >
                                    {front || "No front side description"}
                                  </div>
                                </TabsContent>
                                <TabsContent value="back" className="w-full">
                                  <div
                                    className={cn(
                                      "text-2xl font-medium text-center",
                                      !(back != "") &&
                                        "text-lg text-slate-500 italic"
                                    )}
                                  >
                                    {back || "No front side description"}
                                  </div>
                                </TabsContent>
                              </>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Form>
                  </ScrollArea>
                </div>
                <div className="flex flex-row w-full gap-4">
                  <Button
                    variant="warning"
                    size="rectangle"
                    // onClick={(e) => handleQuestionRemove(index)}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={toggleEdit}
                    variant="primary"
                    size="rectangle"
                  >
                    Edit
                  </Button>
                </div>
              </>
            )}
            {isEditing && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 flex flex-col w-full max-w-[440px] "
                >
                  <FormField
                    control={form.control}
                    name="front"
                    render={({ field }) => (
                      <FormItem className="bg-white border-[#80489C] h-[280px] border-4 rounded-md px-6 pt-4 pb-8">
                        <FormControl>
                          <>
                            <TabsContent
                              value="front"
                              className="w-full h-full"
                            >
                              <Textarea
                                // defaultValue={initialData.front}
                                disabled={isSubmitting}
                                placeholder="e.g. 'Flash card'"
                                value={front}
                                onChange={(e) => setFront(e.target.value)}
                                className="h-full text-center text-lg"
                              />
                            </TabsContent>
                            <TabsContent value="back" className="w-full h-full">
                              <Textarea
                                // defaultValue={initialData.front}
                                disabled={isSubmitting}
                                placeholder="e.g. 'Flash card'"
                                value={back}
                                onChange={(e) => setFront(e.target.value)}
                                className="h-full text-center text-lg"
                              />
                            </TabsContent>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-row w-full gap-4">
                    <Button
                      onClick={toggleEdit}
                      variant="cancel"
                      size="rectangle"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!isValid || isSubmitting}
                      type="submit"
                      variant="primary"
                      size="rectangle"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </>
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
