import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
  RxAccessibility,
} from "react-icons/rx";

import Achievement1 from "@/assets/achievement1.svg";
import Achievement2 from "@/assets/achievement2.svg";
import Achievement3 from "@/assets/achievement3.svg";

export const Data = [
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
  },
  {
    icon: RxPencil2,
    title: "Branding",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: RxDesktop,
    title: "Design",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: RxReader,
    title: "Seo",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: RxAccessibility,
    title: "Management",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: RxRocket,
    title: "Production",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const Achievement = [
  {
    index: 1,
    image: Achievement1,
    content: "Complete 20 lessons",
  },
  {
    index: 2,
    image: Achievement2,
    content: "Finish your first course",
  },
  {
    index: 3,
    image: Achievement3,
    content: "Complete 5 quizzes with no mistakes",
  },
];

import Python from "@/assets/python.svg";

export const courseData = {
  courseName: "Python Bootcamp",
  coursePicture: Python,
  courseDescription:
    "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming. ",
  coursedata: [
    {
      section: "Introduction",
      type: "video",
      title: "Introduction to Python",
      isLearn: true,
    },
    {
      section: "Introduction",
      type: "reading",
      title: "Keywords and Identifiers",
      isLearn: true,
    },
    {
      section: "Introduction",
      type: "reading",
      title: "Statements and Comment",
      isLearn: true,
    },
    {
      section: "Introduction",
      type: "reading",
      title: "Python Variables",
      isLearn: false,
    },
    {
      section: "Review",
      type: "reading",
      title: "Python Datatype",
      isLearn: true,
    },
    {
      section: "Review",
      type: "video",
      title: "Python Datatype",
      isLearn: true,
    },
    {
      section: "Review",
      type: "video",
      title: "Python Type Conversion",
      isLearn: false,
    },
    {
      section: "Review",
      type: "quiz",
      title: "Quiz 1 - Review Chapter 1",
      isLearn: true,
    },
    {
      section: "Review",
      type: "flashcard",
      title: "Flashcard - Chapter 1",
      isLearn: true,
    },
  ],
};
