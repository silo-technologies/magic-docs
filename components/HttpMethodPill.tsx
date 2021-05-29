import React from "react";

type Props = {
  method?: string;
};
const HttpMethodPill: React.FC<Props> = ({ method }) => {
  let colorClassNames = "bg-green-100 text-green-900";
  switch (method) {
    case "POST":
      colorClassNames = "bg-green-800 text-white";
      break;
    case "PUT":
      colorClassNames = "bg-yellow-500 text-white";
      break;
    case "PATCH":
      colorClassNames = "bg-yellow-100 text-yellow-900";
      break;
    case "DELETE":
      colorClassNames = "bg-red-100 text-red-900";
      break;
  }

  return method ? (
    <label className={`${colorClassNames} font-semibold p-2 rounded mr-2`}>
      {method}
    </label>
  ) : null;
};

export default React.memo(HttpMethodPill);
