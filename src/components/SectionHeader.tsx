import React from "react";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title?: string;
  bgColorClassName?: string;
  textColorClassName?: string;
};
const SectionHeader: React.FC<Props> = ({
  icon,
  title,
  bgColorClassName,
  textColorClassName,
}) => {
  return (
    <h2
      className={`w-full text-xl p-2 ml-50 pl-3 flex items-center ${
        textColorClassName || "text-gray-700"
      } ${bgColorClassName} rounded`}
    >
      {icon}
      {title}
    </h2>
  );
};

export default React.memo(SectionHeader);
