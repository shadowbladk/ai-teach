import TextBox from "@/components/TextBox";

const CourseReview = () => {
  return (
    <>
      <div className="p-6 items-center justify-between">
        <h1 className="text-2xl font-extrabold text-black text-center">
          Course Review
        </h1>
      </div>
      <div className="flex justify-center">
        <TextBox />
      </div>
    </>
  );
};

export default CourseReview;
