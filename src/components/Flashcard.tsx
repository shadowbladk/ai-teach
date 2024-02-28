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
  const [isFlipped, setIsFlipped] = useState(false); // Add this state here

  const submitAnswer = (userAnswer: string) => {
    const newAnswer: Answer = {
      wordId: words[currentQuestionIndex].id,
      answer: userAnswer,
      correct: userAnswer === words[currentQuestionIndex].definition,
    };

    setAnswers([...answers, newAnswer]);

    if (currentQuestionIndex < words.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsFlipped(false);
    } else {
      console.log("Submit all answers:", answers);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>{title}</h2>
        <div>{`Word ${currentQuestionIndex + 1}/${words.length}`}</div>
      </div>

      <WordCard
        word={words[currentQuestionIndex].word}
        definition={words[currentQuestionIndex].definition}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />
      <FlashcardGroup submitAnswer={submitAnswer} />
    </section>
  );
};

export default Flashcard;
