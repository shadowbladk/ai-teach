"use client";

import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChevronsLeft, ChevronsRight, PlusCircle } from "lucide-react";

import { Chapter, Course } from "@prisma/client";
import Link from "next/link";

interface SliderProps {
  course: Course & {
    chapters: Chapter[];
  };
  onChapterClick: (title: string) => void;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const Slider = ({ course, onChapterClick }: SliderProps) => {
  const [lengthItems, setLengthItems] = useState(course.chapters.length);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(lengthItems > 3);
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
      await axios.post(`/api/courses/${course.id}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleSlideChange = (swiper: any) => {
    setCanGoPrev(!swiper.isBeginning);
    setCanGoNext(!swiper.isEnd);
  };

  useEffect(() => {
    setLengthItems(course.chapters.length);
    setCanGoNext(course.chapters.length > 3);
  }, [course.chapters.length]);

  return (
    <div className="flex flex-row gap-4 sm:gap-8 items-baseline justify-center">
      <div className="custom-prev-button">
        {canGoPrev ? (
          <ChevronsLeft className="w-5 text-[#4F46E5]" />
        ) : (
          <ChevronsLeft className="w-5 text-[#94A3B8]" />
        )}
      </div>
      <div className="flex flex-row w-[140px] justify-center items-center">
        <Swiper
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          slidesPerView={lengthItems > 3 ? 3 : lengthItems}
          draggable={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
          }}
          modules={[FreeMode, Navigation, Pagination]}
          className="max-w-[300px] sm:max-w-sm lg:max-w-2xl xl:max-w-5xl"
        >
          {course.chapters.map((chapter, index) => (
            <SwiperSlide key={chapter.id} className="max-w-fit mb-16">
              <div className="flex flex-col mx-1 place-items-center group relative cursor-pointer">
                <Link
                  href={`/teacher/edit/${chapter.courseId}/chapters/${chapter.id}`}
                  className="mx-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full"
                  onClick={() => onChapterClick(chapter.title)}
                >
                  {index + 1}
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide className="max-w-fit mb-16">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col mx-1 place-items-center group relative cursor-pointer">
                  <PlusCircle size={32} />
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
                    <Button disabled={!isValid || isSubmitting} type="submit">
                      Create
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="custom-next-button">
        {canGoNext ? (
          <ChevronsRight className="text-[#4F46E5]" />
        ) : (
          <ChevronsRight className="text-[#94A3B8]" />
        )}
      </div>
    </div>
  );
};

export default Slider;
