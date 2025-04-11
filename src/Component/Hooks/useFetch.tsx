import React, { useEffect, useState } from "react";
import { getHotels } from "../../server/server";

function useFetch() {
  const [location, setLocation] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    getHotels()
      .then((res) => {
        console.log(res, "hello");
        setLocation(res);
      })
      .catch((err) => {
        setError("Failed to load locations. Please try again later.");
      });
  }, []);

  return { location, error };
}

export default useFetch;
