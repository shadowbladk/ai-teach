import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ClipboardList,
  FileText,
  PlusCircle,
  Video,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

interface AttachmentProps {
  courseId: string;
  chapterId: string;
}

export const CreateAttachment = ({ courseId, chapterId }: AttachmentProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircle size={40} strokeWidth={1.5} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl">
            Choose Type of Content
          </DialogTitle>
          <DialogDescription>
            <div className="pt-5 grid grid-cols-2 gap-2 justify-items-center">
              <div className="text-center">
                <Link
                  href={`/teacher/edit/${courseId}/chapters/${chapterId}/text`}
                >
                  <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                    <CardContent className="flex items-center justify-center p-2">
                      <FileText size={40} strokeWidth={1.5} />
                    </CardContent>
                  </Card>
                </Link>
                <h3 className="pt-2 text-base">PDF Files</h3>
              </div>
              <div className="text-center">
                <Link
                  href={`/teacher/edit/${courseId}/chapters/${chapterId}/video`}
                >
                  <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                    <CardContent className="flex items-center justify-center p-2">
                      <Video size={40} strokeWidth={1.5} />
                    </CardContent>
                  </Card>
                </Link>
                <h3 className="pt-2 text-base">Videos</h3>
              </div>
              <div className="text-center">
                <Link
                  href={`/teacher/edit/${courseId}/chapters/${chapterId}/quiz`}
                >
                  <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                    <CardContent className="flex items-center justify-center p-2">
                      <ClipboardList size={40} strokeWidth={1.5} />
                    </CardContent>
                  </Card>
                </Link>
                <h3 className="pt-2 text-base">Quizzes</h3>
              </div>
              <div className="text-center">
                <Link
                  href={`/teacher/edit/${courseId}/chapters/${chapterId}/flashcard`}
                >
                  <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                    <CardContent className="flex items-center justify-center p-2">
                      <WalletCards size={40} strokeWidth={1.5} />
                    </CardContent>
                  </Card>
                </Link>
                <h3 className="pt-2 text-base">Flashcards</h3>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
