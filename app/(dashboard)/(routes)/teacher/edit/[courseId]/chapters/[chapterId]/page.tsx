import { ChapterActions } from "./_components/chapter-actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChapterBox } from "./_components/chapter-box";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const chapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title];

  const isComplete = requiredFields.every(Boolean);
  return (
    <div className="w-full justify-center px-6">
      <div className="max-w-[720px] mx-auto flex flex-wrap justify-center">
        <ChapterBox />
        <Dialog>
          <DialogTrigger>
            <PlusCircle size={49} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="max-w-[720px] mx-auto flex flex-wrap justify-end">
        <ChapterActions
          disabled={!isComplete}
          courseId={params.courseId}
          chapterId={params.chapterId}
          isPublished={chapter.isPublished}
        />
      </div>
    </div>
  );
};
export default chapterIdPage;
