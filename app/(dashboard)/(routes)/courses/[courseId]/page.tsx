import React, { useState } from "react";
import CourseHero from "./_components/course-hero";
import CourseDetail from "./_components/course-detail";
import CourseReview from "./_components/course-review";

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
      </div>
    </>
  );
};
