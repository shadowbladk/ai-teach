"use client";
import Quiz from "./_components/Quiz";
import { useState } from "react";

function quiz() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="container mx-auto justify-center max-w-[900px] ">
          <Quiz
            title="Quiz 1: Review Chapter 1"
            questions={[
              {
                id: "1",
                question:
                  "In Python programming, keywords serve a fundamental role in the language. They are used for specific purposes related to the syntax and functionality of Python. Which of the following statements best describes the primary purpose of Python keywords?",
                choices: [
                  "Defining user-defined functions",
                  "Naming variables and objects",
                  "Identifying syntax errors in code",
                  "Signifying reserved words",
                ],
                answer: "Defining user-defined functions",
              },
              {
                id: "2",
                question:
                  "Which of the following statements correctly declares an empty list in Python?",
                choices: [
                  "empty_list = {}",
                  "empty_list = list()",
                  "empty_list = []",
                  "empty_list = [None]",
                ],
                answer: "empty_list = {}",
              },
              {
                id: "3",
                question: "my_list = [1, 2, 3, 4, 5] print(my_list[2:4])",
                choices: ["[3, 4]", "[2, 3]", "[1, 2]", "[4, 5]"],
                answer: "[3, 4]",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default quiz;
