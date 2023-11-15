import Link from "next/link";
import CourseHero from "@/components/CourseHero";

export default function CourseDetail() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow">
          <CourseHero />
        </div>
      </div>
    </>
  );
}
