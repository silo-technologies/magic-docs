declare module "API" {
  global {
    namespace API {
      type Handler = {
        name?: string;
        description?: string;
        pathMethods: [
          {
            method: string;
            path: string;
          }
        ];
        authorization?: {
          authAsBuyer: boolean;
          authAsSeller: boolean;
          accessList?: AccessRule[];
        };
        requestBody?: {
          type: `*protocol.${string}`;
          schema: {
            $schema: string;
            $ref: string;
            definitions: Record<string, Protocol>;
          };
        };
      };
    }
  }
}

type Protocol = {
  type: GoType;
  required?: string[];
  properties?: Record<string, Property>;
  additionalProperties?: boolean;
  patternProperties?: {
    ".*"?: {
      additionalProperties?: boolean;
    };
  };
};

type Property = {
  type: GoType;
  format?: GoTypeFormat;
  $schema?: string;
  $ref?: `#/definitions/${string}`;
};

type GoType = "string" | "integer" | "object";
type GoTypeFormat = "date-time";

type AccessRule = {
  Feature: string;
  Access: "edit" | "view";
};
