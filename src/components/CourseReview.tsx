import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CourseReview = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-extrabold text-black text-center">
          Course Review
        </h1>
      </div>
      <div className="w-full justify-center px-6">
        <div className="max-w-[1040px] mx-auto flex flex-wrap justify-center">
          <Textarea
            className="text-base bg-white border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-primary"
            placeholder="Write a review..."
          />
        </div>
        <div className="max-w-[1040px] mx-auto pt-6 flex flex-wrap justify-end">
          <Button variant="outline">Submit</Button>
        </div>
        <div className="max-w-[1040px] mx-auto flex flex-wrap py-6">
          <h2 className="text-xl font-semibold text-black">
            Review from other students
          </h2>
        </div>
      </div>
    </>
  );
};

export default CourseReview;
