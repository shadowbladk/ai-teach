import React from "react";
import Image from "next/image";

interface CourseBoxProps {
  // imageUrl: string;
  title: string;
  isLearn: boolean;
}

const CourseBox = ({ title, isLearn }: CourseBoxProps) => {
  const boxColor = isLearn ? "bg-[#B99EC8]" : "bg-white";
  return (
    <div
      className={`w-full mb-4 mx-auto rounded-lg p-3 flex items-center justify-between drop-shadow-md ${boxColor}`}
    >
      <div className="flex flex-row flex-grow gap-4 items-center">
        {/* {imageUrl && (
          <Image
            src={imageUrl}
            alt="Course Image"
            className="rounded-full"
            width={30}
            height={30}
          />
        )} */}
        {title && (
          <p className="text-sm text-black font-semibold lg:text-base">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseBox;
