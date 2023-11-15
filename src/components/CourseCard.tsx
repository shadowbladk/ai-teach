import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

interface CourseCardProps {
  imageSrc: string;
  courseTitle: string;
  instructorName: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  imageSrc,
  courseTitle,
  instructorName,
}) => {
  return (
    <>
      <Card className="border-2">
        <CardHeader floated={false} shadow={false} className="h-20">
          <Image src={imageSrc} alt="course-image" width={260} height={260} />
        </CardHeader>
        <CardBody className="p-4">
          <Typography className="font-bold">{courseTitle}</Typography>
          <Typography className="font-medium">{instructorName}</Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default CourseCard;
