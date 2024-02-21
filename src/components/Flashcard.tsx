import React, { useState } from "react";
import FlashcardGroup from "./FlashcardGroup";
import WordCard from "./WordCard";

interface FlashcardProps {
  title: string;
  words: Word[];
}

type Word = {
  id: string;
  word: string;
  definition: string;
  choices: string[];
  answers:string;
};

type Answer = {
  wordId: string;
  answer: string;
  correct: boolean;
};

const Flashcard: React.FunctionComponent<FlashcardProps> = ({
  title,
  words,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const submitAnswer = (answer: Answer) => {
    setAnswers([...answers, answer]);

    if (currentQuestionIndex < words.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Submit");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>{title}</h2>
        <div>{`Word ${currentQuestionIndex + 1}/${words.length}`}</div>
      </div>
      
      <WordCard word={words[currentQuestionIndex].word} definition={""} />
      <FlashcardGroup
        choices={words[currentQuestionIndex].choices}
        answer={words[currentQuestionIndex].answers}
        submitAnswer={submitAnswer}
      />
    </section>
  );
};

export default Flashcard;
