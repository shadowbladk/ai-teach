"use client"

import { useState } from "react"

export const Toggle = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className="flex flex-row justify-center">
      <button
        onClick={() => setToggle(true)}
        className={`flex flex-col justify-center items-center ${
          toggle ? "opacity-100" : "opacity-50"
        }`}
      >
        <h2 className="text-2xl text-center text-primary font-semibold mb-2">
          Enroll
        </h2>
        <div className="rounded-r-none rounded-l w-full bg-primary px-14 py-0.5 text-sm font-semibold text-white shadow-sm hover:opacity-50"></div>
      </button>
      <button
        onClick={() => setToggle(false)}
        className={`flex flex-col justify-center items-center ${
          toggle ? "opacity-50" : "opacity-100"
        }`}
      >
        <h2 className="text-2xl text-center text-primary font-semibold mb-2">
          Teaching
        </h2>
        <div className="rounded-l-none rounded-r w-full bg-primary px-16 py-0.5 text-sm font-semibold text-white shadow-sm hover:opacity-50"></div>
      </button>
    </div>
  )
}
