"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import {
  ClipboardList,
  FileText,
  PlusCircle,
  Video,
  WalletCards,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AttachmentProps {
  courseId: string;
  chapterId: string;
}

export const CreateAttachment = ({ courseId, chapterId }: AttachmentProps) => {
  const router = useRouter();
  const onSubmit = async (type: string) => {
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/${type}`
      );
      const createdId = response.data.id;
      router.push(
        `/teacher/edit/${courseId}/chapters/${chapterId}/${type}/${createdId}`
      );
      toast.success("Content created");
    } catch {
      toast.error("Something went wrong");
    }
  };

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
              <div
                className="text-center"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit("documents");
                }}
              >
                <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                  <CardContent className="flex items-center justify-center p-2">
                    <FileText size={40} strokeWidth={1.5} />
                  </CardContent>
                </Card>
                <h3 className="pt-2 text-base">PDF Files</h3>
              </div>
              <div className="text-center">
                <div
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit("videos");
                  }}
                >
                  <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                    <CardContent className="flex items-center justify-center p-2">
                      <Video size={40} strokeWidth={1.5} />
                    </CardContent>
                  </Card>
                </div>
                <h3 className="pt-2 text-base">Videos</h3>
              </div>
              <div className="text-center">
                <div
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit("quize");
                  }}
                >
                  <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                    <CardContent className="flex items-center justify-center p-2">
                      <ClipboardList size={40} strokeWidth={1.5} />
                    </CardContent>
                  </Card>
                </div>
                <h3 className="pt-2 text-base">Quizzes</h3>
              </div>
              <div className="text-center">
                <div
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit("flashcarddecks");
                  }}
                >
                  <Card className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9]">
                    <CardContent className="flex items-center justify-center p-2">
                      <WalletCards size={40} strokeWidth={1.5} />
                    </CardContent>
                  </Card>
                </div>
                <h3 className="pt-2 text-base">Flashcards</h3>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
