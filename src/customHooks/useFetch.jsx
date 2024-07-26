import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          mode: "no-cors"
        });
        if (!res.ok) {
          throw new Error("server error" + res.status);
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);
  return { data, error };
};
export default useFetch;
