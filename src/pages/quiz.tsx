import Quiz from "@/components/Quiz";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function quiz() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
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
                  "In Java programming, keywords serve a fundamental role in the language. They are used for specific purposes related to the syntax and functionality of Python. Which of the following statements best describes the primary purpose of Python keywords?",
                choices: [
                  "Defining user-defined functions",
                  "Naming variables and objects",
                  "Identifying syntax errors in code",
                  "Signifying reserved words",
                ],
                answer: "Naming variables and objects",
              },
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default quiz;
