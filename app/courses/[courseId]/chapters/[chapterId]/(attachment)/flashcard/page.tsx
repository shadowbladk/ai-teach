"use client";
import Flashcard from "./_components/Flashcard";
import { useState } from "react";

function flashcard() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="container mx-auto justify-center max-w-[980px]">
          <div className="flex flex-col items-center justify-center px-24 py-14 gap-12">
            <h1 className="text-[32px] font-extrabold text-center text-black">
              Flashcard
            </h1>
          </div>
          <Flashcard
            title="Flashcard - Chapter 1"
            words={[
              {
                id: "1",
                word: "Keyword",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "2",
                word: "Keyword2",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "3",
                word: "Keyword3",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "4",
                word: "Keyword4",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "5",
                word: "Keyword5",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "6",
                word: "Keyword6",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "7",
                word: "Keyword7",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "8",
                word: "Keyword8",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "9",
                word: "Keyword9",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
              {
                id: "10",
                word: "Keyword10",
                definition:
                  "Predefined, reserved words used in Python programming that have special meanings to the compiler.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default flashcard;
