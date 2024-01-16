export default function AnswerBox({answer}:{answer : string}) {
    return (
      <>
          <div className="w-[430px] h-[60px] p-4 flex flex-col gap-4 border-4 rounded-xl bg-white w-full lg:flex-row items-center justify-center mx-5 my-2.5">
              <p className="text-[20px] font-normal text-left text-black">{answer}</p>
          </div>
      </>
    );
  }
  