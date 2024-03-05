"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Chapter, Course } from "@prisma/client";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChapterCarouselProps {
  course: Course & {
    chapters: Chapter[];
  };
  onSelectChapter: (index: number) => void;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChapterCarousel = ({
  course,
  onSelectChapter,
}: ChapterCarouselProps) => {
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/courses/${course.id}/chapters`,
        values
      );
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
      // router.push(`/teacher/edit/${course.id}/chapters/${response.data.id}`);
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Carousel className="flex-row max-w-[300px] md:max-w-[600px]">
        <CarouselContent>
          {course.chapters.map((chapter, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/4">
              <div className="p-1 md:p-3">
                <Card className="w-[60px] h-[60px] rounded-full">
                  <CardContent
                    className="flex items-center justify-center p-3 "
                    onClick={() => onSelectChapter(index)}
                  >
                    <Link href="" className="text-2xl font-semibold">
                      {index + 1}
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="basis-1/3 md:basis-1/5">
            <div className="p-1 md:p-3">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex flex-col mx-2 place-items-center group relative cursor-pointer">
                    <PlusCircle size={60} />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <h1 className="text-xl font-extrabold">Create Chapter</h1>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 mt-4"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="e.g. 'Introduction to the course'"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogClose asChild>
                        <Button
                          disabled={!isValid || isSubmitting}
                          type="submit"
                        >
                          Create
                        </Button>
                      </DialogClose>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
