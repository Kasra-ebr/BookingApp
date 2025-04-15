import { useEffect, useState } from "react";
import { getHotels } from "../../Server/server";

function useFetch<T = any>(query: string = "") {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getHotels(query)
      .then((res) => {
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
