import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search?search_query=${keyword}`);
    console.log(keyword);
  };

  const handleClear = () => setKeyword("");

  return (
    <form
      className="border rounded-3xl h-[40px] w-[640px] flex items-center overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="relative flex flex-1 w-full h-full">
        <input
          className="flex-1 h-full px-3 text-sm rounded-l-3xl"
          placeholder="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {keyword.length > 0 ? (
          <button
            type="button"
            className="absolute right-0 -translate-y-1/2 top-1/2 "
            onClick={handleClear}
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-opacity-50 hover:bg-gray-300">
              <RxCross1 className="w-5 h-5 text-gray-500" />
            </div>
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
