import React, { useState } from "react";
import AnswerGroup from "./AnswerGroup";
import QuestionCard from "./QuestionCard";
import QuizModal from "./QuizModal";

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
  const [showModal, setShowModal] = useState(false);

  const calculateScore = (answers: Answer[]): number => {
    let correctAnswers = 0;
    answers.forEach((answer) => {
      if (answer.correct) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const submitAnswer = (selectedAnswer: string) => {
    const answer = {
      questionId: questions[currentQuestionIndex].id,
      answer: selectedAnswer,
      correct: selectedAnswer === questions[currentQuestionIndex].answer,
    };

    setAnswers([...answers, answer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = calculateScore(answers);
      setShowModal(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowModal(false);
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
      <QuizModal
        score={calculateScore(answers)}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onRestart={restartQuiz}
      />
    </section>
  );
};

export default Quiz;
