import React, { useState } from "react";
import AnswerGroup from "./AnswerGroup";
import QuestionCard from "./QuestionCard";

interface QuizProps {
  title: string;
  questions: Question[];
}

type Question = {
  id: string;
  question: string;
  choices: string[];
  answer: string;
};

type Answer = {
  questionId: string;
  answer: string;
  correct: boolean;
};

const Quiz: React.FunctionComponent<QuizProps> = ({ title, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const submitAnswer = (answer: Answer) => {
    setAnswers([...answers, answer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Submit");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>{title}</h2>
        <div>{`Question ${currentQuestionIndex + 1}/${questions.length}`}</div>
      </div>
      <QuestionCard question={questions[currentQuestionIndex].question} />
      <AnswerGroup
        choices={questions[currentQuestionIndex].choices}
        answer={questions[currentQuestionIndex].answer}
        submitAnswer={submitAnswer}
      />
    </section>
  );
};

export default Quiz;
