"use client"

import axios from "axios"
import { useState, SetStateAction } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

import { Question, Answer } from "@prisma/client"

import { PlusCircle, Pencil } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

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
  initialData: (Question & { answers: Answer[] })[]
  courseId: string
  chapterId: string
  questionsetId: string
}

export const QuizForm = ({
  initialData,
  courseId,
  chapterId,
  questionsetId,
}: QuizFormProps) => {
  const [data, setData] = useState(initialData)
  const [questions, setQuestions] = useState<
    (Question & { answers: Answer[] })[]
  >(JSON.parse(JSON.stringify(data)))
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(questions ? 1 : 0)
  const [count, setCount] = React.useState(questions.length)

  const [isEditing, setIsEditing] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")

  const handleRadioChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedValue(event.target.value)
  }

  const toggleEdit = () => setIsEditing((current) => !current)

  const onCancel = (index: number) => {
    setQuestions((prevItems: (Question & { answers: Answer[] })[]) => {
      const updatedItems: (Question & { answers: Answer[] })[] = [...prevItems]
      updatedItems[index] = JSON.parse(JSON.stringify(data[index]))
      return updatedItems
    })
    setSelectedValue(correctAnswer)
    toggleEdit()
  }

  const onSubmit = async (index: number) => {
    let question = questions[index]
    let questionId = question.id
    try {
      let valueQuestion = { text: questions[index].text }
      let resultQ = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions/${questionId}`,
        valueQuestion
      )

      for (let i = 0; i < 4; i++) {
        let valueAnswer = {
          text: question.answers[i].text,
          isCorrect: i == Number(selectedValue),
        }
        {
          i == Number(selectedValue)
            ? (question.answers[i].isCorrect = true)
            : (question.answers[i].isCorrect = false)
        }
        let answerId = question.answers[i].id
        let result = await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions/${questionId}/answers/${answerId}`,
          valueAnswer
        )
      }
      setData(JSON.parse(JSON.stringify(questions)))
      toast.success("Question updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const updateQuestion = (index: number, newValue: string) => {
    setQuestions((prevItems: (Question & { answers: Answer[] })[]) => {
      const updatedItems: (Question & { answers: Answer[] })[] = [...prevItems]
      updatedItems[index].text = newValue
      return updatedItems
    })
  }

  const updateAnswerAtIndex = (
    indexQ: number,
    indexA: number,
    newValue: string
  ) => {
    setQuestions((prevItems: (Question & { answers: Answer[] })[]) => {
      const updatedItems: (Question & { answers: Answer[] })[] = [...prevItems]
      updatedItems[indexQ].answers[indexA].text = newValue
      return updatedItems
    })
  }

  const handleQuestionEdit = (index: number) => {
    questions[index].answers?.map((answer: Answer, index: number) => {
      answer.isCorrect
        ? (setSelectedValue(String(index)), setCorrectAnswer(String(index)))
        : null
    })
    toggleEdit()
  }

  const handleQuestionRemove = async (index: number) => {
    try {
      let question = questions[index]
      let questionId = question.id
      for (let i = 0; i < 4; i++) {
        await axios.delete(
          `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions/${questionId}/answers/${question.answers[i].id}`
        )
      }
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions/${questionId}`
      )
      toast.success("Question deleted")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
    questions.splice(index, 1)
    setCount(questions.length)
    questions.length == 0
      ? setCurrent(0)
      : index == questions.length
      ? setCurrent(current - 1)
      : setCurrent(current)
    toggleEdit()
  }

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

  const handleQuestionAdd = async () => {
    let newQuestion
    try {
      let result = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions`
      )

      newQuestion = await result.data
      for (let i = 0; i < 4; i++) {
        let answer = await axios.post(
          `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions/${newQuestion.id}/answers`
        )
        newQuestion.answers.push(await answer.data)
      }
      toast.success("Question created")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
    setQuestions([newQuestion, ...questions])
    setCount(count + 1)
    api?.scrollTo(0)
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
          disabled={isEditing}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add new question
        </Button>
      </div>
      <Carousel setApi={setApi} className="w-full ">
        <CarouselContent>
          {questions.map((question, index: number) => (
            <CarouselItem key={index}>
              <div className="flex flex-col gap-4">
                <div className="border bg-slate-100 rounded-md p-6 flex flex-col gap-4">
                  <div className="font-medium flex justify-between">
                    Question
                    <Button
                      onClick={(e) => handleQuestionEdit(index)}
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
                      <section className="flex flex-col gap-4">
                        <p
                          className={cn(
                            "text-sm",
                            !question.text && "text-slate-500 italic"
                          )}
                        >
                          {question.text || "No question"}
                        </p>
                        <div className="font-medium flex justify-between">
                          Answer
                        </div>
                        <RadioGroup
                          className="flex flex-col space-y-3"
                          disabled={true}
                        >
                          {question.answers.map((answer: Answer, i: any) => (
                            <div className="flex flex-row items-center space-x-3 space-y-0">
                              <RadioGroupItem
                                value={i}
                                checked={selectedValue === i.toString()}
                              />
                              <p
                                className={cn(
                                  "text-sm",
                                  !answer.text && "text-slate-500 italic"
                                )}
                              >
                                {answer.text || "No answer"}
                              </p>
                            </div>
                          ))}
                        </RadioGroup>
                      </section>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <section className="flex flex-col gap-4">
                        <Textarea
                          placeholder="e.g. 'Question... ?'"
                          value={question?.text || ""}
                          onChange={(e) =>
                            updateQuestion(index, e.target.value)
                          }
                        />
                        <div className="font-medium flex justify-between">
                          Answer
                        </div>
                        <div className="flex flex-col space-y-1">
                          {question.answers.map((answer: Answer, i: any) => (
                            <div className="flex items-center space-x-3 space-y-0">
                              <input
                                type="radio"
                                id={i}
                                value={i}
                                checked={selectedValue === i.toString()}
                                onChange={handleRadioChange}
                              />
                              <Input
                                placeholder={`e.g. 'Choice ${i + 1}'`}
                                value={answer?.text || ""}
                                onChange={(e) =>
                                  updateAnswerAtIndex(index, i, e.target.value)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </section>

                      <div className="flex flex-row justify-between pt-4">
                        <Button
                          variant="warning"
                          size="sm_l"
                          onClick={(e) => handleQuestionRemove(index)}
                        >
                          Delete
                        </Button>
                        <div className="flex justify-end gap-4">
                          <Button
                            variant="underline"
                            size="ghost"
                            onClick={(e) => onCancel(index)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            size="sm_l"
                            variant="primary"
                            onClick={(e) => onSubmit(index)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious disabled={isEditing || !api?.canScrollPrev()} />
        <CarouselNext disabled={isEditing || !api?.canScrollNext()} />
      </Carousel>
    </div>
  )
}
