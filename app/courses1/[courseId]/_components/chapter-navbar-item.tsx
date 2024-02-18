import Link from "next/link";

interface Chapter {
  id: string;
  courseId: string;
}

interface ChapterNavbarItemProps {
  chapter: Chapter;
  number: number;
}

const ChapterNavbarItem: React.FC<ChapterNavbarItemProps> = ({
  chapter,
  number,
}) => {
  return (
    <Link
      href={`/courses1/${chapter.courseId}/chapters1/${chapter.id}`}
      className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full"
    >
      {number}
    </Link>
  );
};

export default ChapterNavbarItem;
