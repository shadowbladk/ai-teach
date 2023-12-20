import Python from "@/assets/pythoncard.svg"

import Image from "next/image"
import Link from "next/link"

export default function Card() {
  return (
    <>
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
    </>
  )
}
