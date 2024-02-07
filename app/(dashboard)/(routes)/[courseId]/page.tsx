import React, { useState } from "react";
import CourseHero from "@/components/CourseHero";
import CourseDetail from "@/components/CourseDetail";
import { courseData } from "@/constants";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseReview from "@/components/CourseReview";

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("courseDetail");

  const handleReviewTabClick = () => {
    setActiveTab("review");
  };

  const handleCourseDetailTabClick = () => {
    setActiveTab("courseDetail");
  };
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-grow min-h-screen">
          <div>
            <CourseHero
              {...courseData}
              onReviewTabClick={handleReviewTabClick}
              onCourseDetailTabClick={handleCourseDetailTabClick}
            />
          </div>
          <div className="pb-16 flex flex-col h-full">
            {activeTab === "review" && (
              <div>
                <CourseReview />
              </div>
            )}
            {activeTab === "courseDetail" && (
              <div>
                <CourseDetail courseData={courseData} />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
