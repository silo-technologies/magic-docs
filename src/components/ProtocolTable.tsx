import React, { ReactNode } from "react";

type Props = {
  protocolKey?: string;
  rows?: ReactNode;
};
const ProtocolTable: React.FC<Props> = ({ protocolKey, rows }) => {
  return (
    <div className="container mx-auto my-3 flex">
      <div className="hidden md:flex flex-col items-end w-30 text-right text-1xl text-blue-800 font-mono font-semibold p-3">
        {protocolKey ? (
          <div className="h-8 flex flex-col-reverse">
            <h3>Name</h3>
          </div>
        ) : null}
        <div
          className={`${protocolKey ? "h-12" : "h-8"} flex flex-col-reverse`}
        >
          <h3>Properties</h3>
        </div>
      </div>

      <div className="flex-grow shadow-md border border-gray-100 rounded p-3">
        {protocolKey ? (
          <p className="mb-4 font-semibold tracking-wide text-2xl">
            {protocolKey}
          </p>
        ) : null}
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(ProtocolTable);
