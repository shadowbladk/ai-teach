"use client"

import * as z from "zod"
import axios, { all } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState, useEffect, SetStateAction } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Answer, Course, Question } from "@prisma/client"
import _ from "lodash"

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
  initialData: Question & { answers: Answer[] }
  courseId: string
  chapterId: string
  questionsetId: string
}

interface AnswerProps {
  text: string
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
}: QuizAnswerFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState(initialData)
  const [question, setQuestion] = useState(JSON.parse(JSON.stringify(data)))
  // const [oldQuestion, setOldQuestion] = useState(_.cloneDeep(question))
  const [answers, setAnswers] = useState(
    JSON.parse(JSON.stringify(data.answers))
  )
  // const [oldAnswers, setOldAnswers] = useState(_.cloneDeep(answers))
  const [selectedValue, setSelectedValue] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")

  const setDefaultAnswer = () => {
    answers?.map((answer: Answer, index: number) => {
      answer.isCorrect
        ? (setSelectedValue(String(index)), setCorrectAnswer(String(index)))
        : null
    })
  }

  const handleRadioChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedValue(event.target.value)
  }

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onCancel = () => {
    setQuestion(JSON.parse(JSON.stringify(data)))
    setAnswers(JSON.parse(JSON.stringify(data.answers)))
    setSelectedValue(correctAnswer)

    toggleEdit()
  }

  const onSubmit = async () => {
    console.log("a", answers)
    console.log("selected", selectedValue)
    try {
      let valueQuestion = { text: question.text }
      let result = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions/${question.id}`,
        valueQuestion
      )
      console.log("resultQ", result)
      for (let i = 0; i < 4; i++) {
        let valueAnswer = {
          text: answers[i].text,
          isCorrect: i == Number(selectedValue),
        }
        let quizId = answers[i].id
        let result = await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/questionset/${questionsetId}/questions/${question.id}/answers/${quizId}`,
          valueAnswer
        )
        console.log("result", i, result)
      }
      toast.success("Question updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const updateQuestion = (newValue: string) => {
    setQuestion({ ...question, text: newValue })
  }

  const updateAnswerAtIndex = (index: number, newValue: string) => {
    setAnswers((prevItems: Answer[]) => {
      const updatedItems: Answer[] = [...prevItems]
      updatedItems[index].text = newValue
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
          <section className="flex flex-col gap-4">
            <p
              className={cn(
                "text-sm",
                !question.text && "text-slate-500 italic"
              )}
            >
              {question.text || "No question"}
            </p>
            <div className="font-medium flex justify-between">Answer</div>
            {answers.length != 0 ? (
              <RadioGroup className="flex flex-col space-y-3" disabled={true}>
                {answers?.map((answer: Answer, index: any) => (
                  <div className="flex flex-row items-center space-x-3 space-y-0">
                    <RadioGroupItem
                      value={index}
                      checked={selectedValue === index.toString()}
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
            ) : (
              <p className="text-sm text-slate-500 italic">No answer</p>
            )}
          </section>
        </>
      )}
      {isEditing && (
        <>
          <section className="flex flex-col gap-4">
            <Textarea
              // disabled={isSubmitting}
              placeholder="e.g. 'Question... ?'"
              value={question?.text || ""}
              onChange={(e) => updateQuestion(e.target.value)}
            />
            <div className="font-medium flex justify-between">Answer</div>
            <div className="flex flex-col space-y-1">
              {answers.map((answer: Answer, index: number) => (
                <div className="flex items-center space-x-3 space-y-0">
                  <input
                    type="radio"
                    id={index.toString()}
                    value={index.toString()}
                    checked={selectedValue === index.toString()}
                    onChange={handleRadioChange}
                  />
                  <Input
                    // disabled={isSubmitting}
                    placeholder={`e.g. 'Choice ${index + 1}'`}
                    value={answer?.text || ""}
                    onChange={(e) => updateAnswerAtIndex(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </section>

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
                variant="underline"
                size="ghost"
                // className={isEditing ? "flex" : "hidden"}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                // disabled={!isValid || isSubmitting}
                type="submit"
                size="sm_l"
                variant="primary"
                onClick={onSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
