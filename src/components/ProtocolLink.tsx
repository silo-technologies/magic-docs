import { ExternalLinkIcon } from "@heroicons/react/solid";
import React from "react";

const ProtocolLink: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    type="button"
    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {children}
    <ExternalLinkIcon className="w-4 ml-1" />
  </button>
);

export default React.memo(ProtocolLink);
