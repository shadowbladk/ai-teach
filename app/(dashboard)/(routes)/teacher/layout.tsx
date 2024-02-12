import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  // Todo: Redirect to login page if user is not a teacher
  // redirect("/");

  return <>{children}</>;
};

export default TeacherLayout;
