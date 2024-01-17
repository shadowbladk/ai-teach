import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuestionCard from "@/components/QuestionCard";
import AnswerBox from "@/components/AnswerBox";

function quiz() {
    const [toggle, setToggle] = useState(false)
  
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">
          <div className="container mx-auto justify-center max-w-[900px] ">
            <section className="flex flex-col items-center justify-center px-23 py-16 gap-12">
              <h1 className="text-[32px] font-extrabold text-center text-black">
                Quiz
              </h1>
              <div className="flex flex-col w-full max-w-[900px] lg:flex-row items-center justify-between">
                <p className="text-[24px] font-extrabold text-left text-black">
                  Quiz 1 - Review Chapter 1
                </p>
                <p className="text-[24px] font-extrabold text-right text-black">
                  Question 1/10
                </p>
              </div>
              <div className="flex flex-col w-full justify-center">
                <QuestionCard/>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col w-full lg:flex-row items-center justify-between">
                  <AnswerBox answer="Defining user-defined functions"></AnswerBox>
                  <AnswerBox answer="Naming variables and objects"></AnswerBox>
                </div>
                <div className="flex flex-col w-full lg:flex-row items-center justify-between">
                  <AnswerBox answer="Identifying syntax errors in code"></AnswerBox>
                  <AnswerBox answer="Signifying reserved words"></AnswerBox>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  export default quiz