import CourseCard from "@/components/CourseCard";

export default function Page() {
  return (
    <div className="flex flex-row">
      <CourseCard
        imageSrc="python.svg"
        courseTitle="Python Bootcamp"
        instructorName="Marry Jane"
      />
    </div>
  );
}
