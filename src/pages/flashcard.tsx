import Flashcard from "@/components/Flashcard";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function flashcard() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
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
                  "predefined, reserved words used in Python programming that have special meanings to the compiler.",
                choices: ["Know", "Don't Know"],
                answers: "Know",
              },
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default flashcard;



