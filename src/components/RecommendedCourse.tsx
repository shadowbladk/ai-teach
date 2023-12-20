import Python from "@/assets/pythoncard.svg"
import Calculus from "@/assets/calculuscard.svg"
import English from "@/assets/englishcard.svg"

import Image from "next/image"
import Link from "next/link"
// import Card from "./Card"

export default function RecommendedCourse() {
  return (
    <>
      <div className="relative overflow-hidden lg:max-w-5xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          // style={{
          //   transform: `translateX(-${curr * 100}%)`,
          // }}
        >
          <div className="flex flex-row gap-12">
            <Link href="/courseDetail">
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  border: "2px solid #DDDDDD",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
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
            <div
              style={{
                width: "300px",
                height: "300px",
                border: "2px solid #DDDDDD",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "260px",
                  height: "150px",
                  borderRadius: "5px",
                }}
              >
                <Image
                  className="object-none"
                  src={Calculus}
                  alt={"Calculus"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <h3 className="text-xl font-semibold">
                  Introduction to Calculus
                </h3>
                <p className="text-base">Tawan Lek-Ngam</p>
              </div>
            </div>
            <div
              style={{
                width: "300px",
                height: "300px",
                border: "2px solid #DDDDDD",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "260px",
                  height: "150px",
                  borderRadius: "5px",
                }}
              >
                <Image className="object-none" src={English} alt={"English"} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <h3 className="text-xl font-semibold">Welcome to English</h3>
                <p className="text-base">Tawan Lek-Ngam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 py-4">
        <button className="h-3 w-3 rounded-full bg-secondary transition-all p-2" />
        <button className="h-3 w-3 rounded-full bg-secondary transition-all bg-opacity-50" />
        <button className="h-3 w-3 rounded-full bg-secondary transition-all bg-opacity-50" />
      </div>
    </>
  )
}
