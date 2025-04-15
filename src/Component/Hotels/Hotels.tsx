import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { IHotel } from "./../../Type/Type";
import { useHotelsContext } from "../Context/HotelProvider";

function Hotels() {
  const {hotels, error, isLoading} = useHotelsContext()
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
