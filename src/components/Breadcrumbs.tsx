import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";

type Props = {
  stack: string[];
  onCrumbClicked: (index: number) => void;
};
const Breadcrumbs: React.FC<Props> = ({ stack, onCrumbClicked }) => {
  return stack.length > 1 ? (
    <div className="m-3 pb-1 flex flex-wrap border-b border-gray-200">
      <strong
        onClick={() => onCrumbClicked(0)}
        className="text-blue-500 hover:bg-blue-100 rounded py-2 px-1 leading-none cursor-pointer"
      >
        {stack[0]}
      </strong>
      {stack.map((entry, index) => {
        return index === 0 ? null : (
          <span
            key={index}
            onClick={() => onCrumbClicked(index)}
            className={`flex items-center py-2 px-1 ml-1 leading-none ${
              index === stack.length - 1
                ? "text-blue-900"
                : "text-blue-500 hover:bg-blue-100 rounded cursor-pointer"
            }`}
          >
            <ChevronRightIcon className="w-4 ml-1" /> {entry}
          </span>
        );
      })}
    </div>
  ) : null;
};

export default React.memo(Breadcrumbs);
