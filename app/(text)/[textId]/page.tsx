import PdfViewer from "./_components/pdf-viewer";

export default function text() {
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <div className="flex-grow">
          <section className="flex flex-col w-screen items-center justify-center p-6">
            <h1 className="text-2xl font-extrabold text-black ">
              Keywords and Identifiers
            </h1>
            <div className="w-full max-w-[1040px] p-6">
              <PdfViewer url={"https://pdfobject.com/pdf/sample.pdf"} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
