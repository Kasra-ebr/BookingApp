import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { IHotel } from "./../../Type/Type";

function Hotels() {
  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination") || "";
  const optionsParam = searchParams.get("options");
  const room: number = optionsParam ? JSON.parse(optionsParam).room : 1;

  const {
    data: hotels,
    error,
    isLoading,
  } = useFetch<IHotel[]>(`q=${destination}&accommodates_gte=${room}`);

  if (error) return <div>Please try again</div>;

  return (
    <div className="searchList">
      <h2>Hotels ({hotels?.length})</h2>

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          hotels?.map((item) => {
      
            return (
              <Link
                key={item.id}
                to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              >
                <div className="searchItem">
                  <img
                    src={item.xl_picture_url || item.thumbnail_url}
                    alt={item.name}
                  />
                  <div className="searchItemDesc">
                    <p className="location">{item.smart_location}</p>
                    <p className="name">{item.name}</p>
                    <p>
                      €{item.price}
                      <span>/night</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Hotels;
