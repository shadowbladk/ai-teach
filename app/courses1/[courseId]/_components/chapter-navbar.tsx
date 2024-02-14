import { Course, Chapter } from "@prisma/client";
import ChapterNavbarItem from "./chapter-navbar-item";

interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

const ChapterNavbar: React.FC<ChapterNavbarProps> = ({ course }) => {
  return (
    <div className="flex-col">
      <div className="flex justify-center mt-4">
        {course.chapters.map((chapter, index) => (
          <button key={chapter.id}>
            <ChapterNavbarItem chapter={chapter} number={index + 1} />
          </button>
        ))}
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-extrabold text-black text-center">
          {course.chapters[0]?.title}
        </h1>
      </div>
    </div>
  );
};

export default ChapterNavbar;
