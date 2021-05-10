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
    <>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
    </>
  );
};

export default Handler;
