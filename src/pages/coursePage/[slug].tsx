import React, { useState } from "react";
import Link from "next/link";
import CourseHero from "@/components/CourseHero";
import CourseBox from "@/components/CourseBox";
import { courseData } from "@/constants";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CoursePage() {
  // Extracting unique section names
  const uniqueSections = [
    ...new Set(courseData.coursedata.map((course) => course.section)),
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const sectionsPerPage = 1;

  // Logic to calculate pagination
  const indexOfLastSection = (currentPage + 1) * sectionsPerPage;
  const indexOfFirstSection = indexOfLastSection - sectionsPerPage;
  const currentSections = uniqueSections.slice(
    indexOfFirstSection,
    indexOfLastSection
  );

  // Function to handle pagination
  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-grow min-h-screen">
          <div>
            <CourseHero {...courseData} />
          </div>
          {currentSections.map((section, index) => (
            <div key={index} className="pb-16 flex flex-col h-full">
              <div className="flex justify-center mt-4">
                {Array.from({ length: uniqueSections.length }, (_, i) => (
                  <Link
                    href={`/coursePage/${i + 1}`}
                    key={i}
                    onClick={() => handlePageChange(i)} // Update current page when clicked
                    className={`mx-1 px-3 py-1 ${
                      currentPage === i
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800"
                    } rounded`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-extrabold text-black text-center">
                  {section}
                </h1>
              </div>
              <div className="w-full justify-center px-6">
                <div className="max-w-[720px] mx-auto flex flex-wrap justify-center">
                  {courseData.coursedata
                    .filter((course) => course.section === section)
                    .map((course, index) => (
                      <CourseBox
                        key={index}
                        title={course.title}
                        isLearn={course.isLearn}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
