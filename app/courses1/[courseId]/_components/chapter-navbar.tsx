import { Course, Chapter } from "@prisma/client";

interface ChapterNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

export const ChapterNavbar = ({ course }: ChapterNavbarProps) => {
  return <div>Chapter Navbar</div>;
};
