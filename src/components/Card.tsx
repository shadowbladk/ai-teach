import Python from "../assets/pythoncard.svg"
import Calculus from "../assets/calculuscard.svg"
import English from "../assets/englishcard.svg"

import Image from "next/image"

export default function Card() {
  return (
    <>
    <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
        }}>
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
          <Image className="object-none" src={Calculus} alt={"Calculus"} />
        </div>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
          <h3 className="text-xl font-semibold">Introduction to Calculus</h3>
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
    </>
  )
}
