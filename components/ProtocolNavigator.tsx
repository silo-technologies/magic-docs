import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import NoResults from "./NoResults";
import ProtocolLink from "./ProtocolLink";
import ProtocolTable from "./ProtocolTable";
import SectionHeader from "./SectionHeader";

const stripRefPrefix = ($ref?: string) =>
  $ref?.replace("#/definitions/", "") ?? "";

const stripProtocolTypePrefix = (type?: string) => {
  if (!type) {
    return "";
  }
  const chunks = type?.split(".");
  return chunks[chunks.length - 1] ?? "";
};

type Props = {
  httpObj?: API.HTTPObject;
  icon?: ReactNode;
  title?: string;
  colorClassName?: string;
};
const ProtocolNavigator: React.FC<Props> = ({
  httpObj,
  icon,
  title,
  colorClassName,
}) => {
  const protocolMap: Record<string, API.Protocol> =
    httpObj?.schema?.definitions ?? {};
  const [protocolStack, setProtocolStack] = useState<string[]>([]);
  const protocolKey = protocolStack[protocolStack.length - 1];
  const protocol = protocolMap[protocolKey] as API.Protocol;

  // Initialize the root protocol
  useEffect(() => {
    if (httpObj?.schema?.type === "array") {
      setProtocolStack([stripRefPrefix(httpObj?.schema?.items?.$ref)]);
    } else {
      setProtocolStack([stripRefPrefix(httpObj?.schema?.$ref)]);
    }
  }, [httpObj]);

  const push = useCallback(
    (protocol: string) => {
      const newStack = protocolStack.slice();
      newStack.push(protocol);
      setProtocolStack(newStack);
    },
    [protocolStack, setProtocolStack]
  );

  const navigate = useCallback(
    (crumbIndex: number) => {
      const newStack = protocolStack.slice();
      newStack.splice(crumbIndex + 1);
      setProtocolStack(newStack);
    },
    [protocolStack, setProtocolStack]
  );

  return (
    <>
      <SectionHeader icon={icon} title={title} className={colorClassName} />
      {httpObj ? (
        <>
          <Breadcrumbs stack={protocolStack} onCrumbClicked={navigate} />
          <ProtocolTable
            protocolKey={protocolKey}
            rows={Object.keys(protocol?.properties ?? {})
              .sort((a, b) => {
                // Sort objects, then arrays, then primitives
                const propA = protocol?.properties?.[a];
                const propB = protocol?.properties?.[b];
                return propA?.$ref && !propB?.$ref
                  ? -3
                  : propB?.$ref && !propA?.$ref
                  ? 3
                  : propA?.type === "array" && propB?.type !== "array"
                  ? -2
                  : propB?.type === "array" && propA?.type !== "array"
                  ? 2
                  : a.localeCompare(b);
              })
              .map((propertyKey) => {
                const property = protocol?.properties?.[propertyKey];
                const ref = stripRefPrefix(
                  property?.$ref ?? property?.items?.$ref
                );
                return (
                  <tr key={propertyKey} className="h-10">
                    <td className="pr-3">{propertyKey}</td>
                    <td className="text-blue-800">
                      {property?.type ?? "object"}
                    </td>
                    <td>
                      {ref ? (
                        <ProtocolLink onClick={() => push(ref)}>
                          {ref}
                        </ProtocolLink>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
          />
        </>
      ) : (
        <NoResults colorClassName={colorClassName} />
      )}
    </>
  );
};

export default React.memo(ProtocolNavigator);
