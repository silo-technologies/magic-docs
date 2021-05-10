import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Handler = () => {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState<API.Handler>();

  useEffect(() => {
    if (!name) {
      return;
    }

    axios
      .get<API.Handler>(
        `https://usesilo-stage.herokuapp.com/api/docs/handlers/${name}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [name]);

  return (
    <div className="relative bg-white border-b-2 border-gray-100 py-6">
      <div className="container mx-auto flex flex-row items-center">
        <div className="flex flex-col mr-8">
          <h1 className="text-3xl">{data?.name}</h1>
          <p>{data?.description}</p>
        </div>
        <label className="bg-green-100 text-green-900 font-semibold p-2 rounded h-auto mr-2">
          {data?.pathMethods?.[0].method}
        </label>
        <p className="text-gray-500 text-xl">{data?.pathMethods?.[0].path}</p>
      </div>
    </div>
  );
};

export default Handler;
