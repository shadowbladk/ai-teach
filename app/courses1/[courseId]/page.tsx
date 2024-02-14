import React, { useState } from "react";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import CourseHero from "./_components/course-hero";
import CourseReview from "./_components/course-review";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  // return redirect(`/courses1/${course.id}/chapters/${course.chapters[0].id}`);

  return (
    <>
      {/* <div className="flex min-h-screen flex-col overflow-x-hidden">
        <div className="flex-grow min-h-screen">
          <div>
            <CourseHero
              courseName={course.title}
              coursePicture={course.imageUrl!}
              courseDescription={course.description!}
              // onReviewTabClick={handleReviewTabClick}
              // onCourseDetailTabClick={handleCourseDetailTabClick}
            />
          </div>
          <div className="pb-16 flex flex-col h-full">
            {/* {activeTab === "review" && (
              <div>
                <CourseReview />
              </div>
            )}
            {activeTab === "courseDetail" && ( 
            <div className="p-6">
              <h1 className="text-2xl font-extrabold text-black text-center">
                {chapters.title}
              </h1>
            </div>
            <div className="w-full justify-center px-6">
              <div className="max-w-[720px] mx-auto flex flex-wrap justify-center">
                <CourseBox
                  key={chapters.id}
                  title={attachments.name}
                  isLearn={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CoursePage;
