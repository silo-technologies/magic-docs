import React from "react";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title?: string;
  className?: string;
};
const SectionHeader: React.FC<Props> = ({ icon, title, className }) => {
  return (
    <h2
      className={`w-full text-xl p-2 ml-50 pl-3 flex items-center text-gray-700 ${className} rounded`}
    >
      {icon}
      {title}
    </h2>
  );
};

export default React.memo(SectionHeader);
