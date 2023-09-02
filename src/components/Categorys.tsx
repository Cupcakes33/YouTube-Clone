import React from "react";
import { CategoryId } from "../types/instance";
import cn from "../utils/cn";

type CategoryLabel = "전체" | "음악" | "스포츠" | "게임" | "엔터테인먼트";
type Category = {
  id: CategoryId;
  label: CategoryLabel;
};

const CATEGORYS: Category[] = [
  { id: "0", label: "전체" },
  { id: "10", label: "음악" },
  { id: "15", label: "스포츠" },
  { id: "17", label: "게임" },
  { id: "20", label: "엔터테인먼트" },
];

type Props = {
  handleClick: React.Dispatch<React.SetStateAction<CategoryId>>;
  selected: CategoryId;
};

export default function Categorys({ handleClick, selected }: Props) {
  return (
    <div className="fixed z-40  mt-[56px] w-full bg-white px-5">
      <div className="flex justify-start gap-2 w-full py-3">
        {CATEGORYS.map((cat) => (
          <button
            key={cat.id}
            className={cn(
              "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 bg-gray-100 rounded-md transition",
              selected === cat.id && "bg-gray-900 text-gray-200"
            )}
            onClick={() => handleClick(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
