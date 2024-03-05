import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const ChapterCarousel = () => {
  return (
    <Carousel className="flex-row max-w-[300px] md:max-w-[720px]">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/3 md:basis-1/4 lg:basis-1/5"
          >
            <div className="p-1 md:p-3">
              <Card className="w-[60px] h-[60px] rounded-full">
                <CardContent className="flex items-center justify-center p-3">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
        <CarouselItem className="basis-1/3 md:basis-1/5">
          <div className="p-1 md:p-3">
            <PlusCircle size={60} />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
