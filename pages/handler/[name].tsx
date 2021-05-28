import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProtocolNavigator from "../../components/ProtocolNavigator";
import { CloudUploadIcon, CloudDownloadIcon } from "@heroicons/react/solid";

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
    <div className="w-100 p-3">
      <div className="relative bg-white border-b-2 border-gray-100 p-6">
        <div className="container mx-auto flex flex-row items-center flex-wrap">
          <div className="flex flex-col mr-8">
            <h1 className="text-3xl">{data?.name}</h1>
            <p>{data?.description}</p>
          </div>
          <div className="flex items-center">
            <label className="bg-green-100 text-green-900 font-semibold p-2 rounded h-auto mr-2">
              {data?.pathMethods?.[0].method}
            </label>
            <p className="text-gray-500 text-xl">
              {data?.pathMethods?.[0].path}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-row py-6 flex-wrap">
        <div className="flex-grow w-5/12 min-w-min md:pr-3">
          <h2 className="text-xl p-2 ml-50 pl-3 flex items-center text-gray-700 bg-pink-100 rounded">
            <CloudUploadIcon className="w-5 mr-2" />
            Request
          </h2>
          <ProtocolNavigator httpObj={data?.requestBody} />
        </div>
        <div className="flex-grow w-5/12 min-w-min md:pr-3">
          <h2 className="text-xl p-2 ml-50 pl-3 flex items-center text-gray-700 bg-yellow-100 rounded">
            <CloudDownloadIcon className="w-5 mr-2" />
            Response
          </h2>
          <ProtocolNavigator httpObj={data?.responseBody} />
        </div>
      </div>
    </div>
  );
};

export default Handler;
