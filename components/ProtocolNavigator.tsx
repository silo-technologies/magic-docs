import React, { useState } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const stripDefinitionPrefix = ($ref?: string) =>
  $ref?.replace("#/definitions/", "") ?? "";

type Props = {
  httpObj?: API.HTTPObject;
};
const ProtocolNavigator: React.FC<Props> = ({ httpObj }) => {
  const protocolKey = stripDefinitionPrefix(httpObj?.schema?.$ref);
  const protocol = httpObj?.schema?.definitions?.[protocolKey] as API.Protocol;
  return httpObj ? (
    <div key={protocolKey} className="container mx-auto rounded my-3 flex">
      <div className="flex flex-col items-end w-40 text-right text-1xl text-blue-800 font-mono font-semibold mr-3 p-3">
        <h3 className="mb-6 leading-8">Name</h3>
        <h3 className="mt-2">Properties</h3>
      </div>

      <div className="flex-grow shadow-md rounded p-3">
        <p className="mb-6 font-semibold tracking-wide text-2xl">
          {protocolKey}
        </p>
        <table>
          <tbody>
            {Object.keys(protocol?.properties ?? {})
              .sort((a, b) => {
                const propA = protocol?.properties?.[a];
                const propB = protocol?.properties?.[b];
                return propA?.$ref && !propB?.$ref
                  ? -2
                  : propB?.$ref && !propA?.$ref
                  ? 2
                  : a.localeCompare(b);
              })
              .map((propertyKey) => {
                const property = protocol?.properties?.[propertyKey];
                return (
                  <tr key={propertyKey} className="h-12">
                    <td className="pr-3">{propertyKey}</td>
                    <td>
                      {property?.$ref ? (
                        <RefLink>
                          {stripDefinitionPrefix(property?.$ref)}
                        </RefLink>
                      ) : (
                        <span className="text-blue-600">{property?.type}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
};

const RefLink: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
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

export default React.memo(ProtocolNavigator);
