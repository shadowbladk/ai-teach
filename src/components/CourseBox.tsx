import React from "react";
import Image from "next/image";

interface CourseBoxProps {
  imageUrl?: string;
  title?: string;
  isLearn?: boolean;
}

const CourseBox: React.FC<CourseBoxProps> = ({ imageUrl, title, isLearn }) => {
  const boxColor = isLearn ? "bg-[#B99EC8]" : "bg-white";
  return (
    <div
      className={`w-full max-w-[980px] mb-4 mx-auto rounded-[10px] p-4 flex items-center justify-between drop-shadow-md ${boxColor}`}
    >
      <div className="flex items-center">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Course Image"
            className="rounded-full mr-8"
            width={40}
            height={40}
          />
        )}
        {title && <p className="text-black font-semibold">{title}</p>}
      </div>
    </div>
  );
};

export default CourseBox;
