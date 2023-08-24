import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(input);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <form
      className="border rounded-3xl h-[40px] w-[640px] flex items-center overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-1 w-full h-full">
        <input
          className="flex-1 h-full px-3 text-sm rounded-l-3xl"
          placeholder="검색"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input.length > 0 ? (
          <button type="button" className="mr-2" onClick={handleClear}>
            <RxCross1 className="w-5 h-5 text-gray-500" />
          </button>
        ) : null}
      </div>
      <button
        className="w-[64px] h-full cursor-pointer border-l bg-gray-100 inline-flex items-center justify-center transition hover:bg-gray-200"
        type="submit"
      >
        <BsSearch className="w-5 h-5 text-gray-500" />
      </button>
    </form>
  );
}
