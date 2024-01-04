import Python from "@/assets/pythoncard.svg";

import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <>
      <Link href="/coursePage">
        <div className="w-[300px] h-[300px] p-4 flex flex-col gap-4 border-2 border-[#DDDDDD] rounded-xl bg-white">
          <div
            style={{
              width: "260px",
              height: "150px",
              borderRadius: "5px",
            }}
          >
            <Image className="object-none" src={Python} alt={"Python"} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h3 className="text-xl font-semibold">Python bootcamp</h3>
            <p className="text-base">Mary Jane</p>
          </div>
        </div>
      </Link>
    </>
  );
}
