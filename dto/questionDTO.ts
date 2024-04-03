export interface QuestionDTO {
  question: string;
  answers: [
    {
      answer: string;
      isCorrect: boolean;
    },
    {
      answer: string;
      isCorrect: boolean;
    },
    {
      answer: string;
      isCorrect: boolean;
    },
    {
      answer: string;
      isCorrect: boolean;
    }
  ];
}
