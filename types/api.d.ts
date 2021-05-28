declare module "API" {
  global {
    namespace API {
      type AccessRule = {
        Feature: string;
        Access: "edit" | "view";
      };

      type ArrayDefinition = {
        $ref?: Ref;
        $schema?: string;
      };

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
        requestBody?: HTTPObject;
        responseBody?: HTTPObject;
      };

      type HTTPObject = {
        type: `*protocol.${string}`;
        schema?: {
          $schema: string;
          $ref: string;
          definitions: Record<string, Protocol>;
        };
      };

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
        items?: ArrayDefinition;
        $schema?: string;
        $ref?: Ref;
      };

      type GoType = "string" | "integer" | "object";
      type GoTypeFormat = "date-time";

      type Ref = `#/definitions/${string}`;
    }
  }
}
