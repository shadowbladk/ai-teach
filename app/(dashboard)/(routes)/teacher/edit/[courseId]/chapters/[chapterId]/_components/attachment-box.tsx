import Link from "next/link";

export const ChapterBox = ({ name, link }: { name: string; link: string }) => {
  return (
    <Link href={link}>
      <div className="w-full mb-6 mx-auto rounded-lg p-3 flex items-center justify-between drop-shadow-md bg-primary">
        <div className="flex flex-row flex-grow gap-4 items-center">
          <p className="text-sm text-black font-semibold lg:text-base">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
};
