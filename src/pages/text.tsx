import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function text() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">
          <section className="flex flex-col w-screen items-center justify-center p-6">
            <h1 className="text-2xl font-extrabold text-black ">
              Keywords and Identifiers
            </h1>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
