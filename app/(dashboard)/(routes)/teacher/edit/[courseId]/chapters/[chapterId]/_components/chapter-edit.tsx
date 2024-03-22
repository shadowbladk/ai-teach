import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChaptersForm } from "./chapters-form";

import { Chapter, Course } from "@prisma/client";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, PlusCircle } from "lucide-react";

interface ChapterEditProps {
  course: Course & {
    chapters: Chapter[];
  };
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChapterEdit = ({ course }: ChapterEditProps) => {
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
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusCircle size={40} strokeWidth={1.5} />
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="Edit">Modify</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
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
                    </FormItem>
                  )}
                />
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Create
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="Edit">
            <ChaptersForm initialData={course} courseId={course.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
