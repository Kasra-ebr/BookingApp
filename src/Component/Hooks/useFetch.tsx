import { useEffect, useState } from "react";
import { getHotels } from "../../Server/server"; // assuming this function handles query logic

function useFetch<T = any>(query: string = "") {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getHotels(query)
      .then((res) => {
        console.log("Fetched data:", res);
        setData(res);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      });
  }, [query]);

  return { data, isLoading, error };
}

export default useFetch;
