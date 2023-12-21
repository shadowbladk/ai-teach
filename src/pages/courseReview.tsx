import CourseHero from "@/components/CourseHero";
import Python from "@/assets/python.svg";
import TextBox from "@/components/TextBox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseDetail() {

  const courseHeroData = {
    courseName: "Python Bootcamp",
    coursePicture: Python,
    courseDescription:
      "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming. ",
    reading: 15,
    video: 5,
    quiz: 3,
    flashcard: 3,
  };

  return (
    <>
      <div className="flex flex-col w-screen">
        <Navbar />
        <div className="flex w-screen">
          <CourseHero {...courseHeroData} />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-black text-center">
            Course Review
          </h1>
          <div className="text-center">
            <TextBox />
          </div>
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
