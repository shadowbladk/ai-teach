import React from "react";
import Image from "next/image";
import search from "@/assets/search.svg";

const SearchBox: React.FC = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="block w-full pr-10 py-2 pl-3 text-base border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-primary"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Image
          src={search}
          className="w-5 h-5 text-gray-400"
          aria-hidden="true"
          alt="arrow"
        />
      </div>
    </div>
  );
};

export default SearchBox;
