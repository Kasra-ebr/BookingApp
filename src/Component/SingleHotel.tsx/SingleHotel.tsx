import React, { useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import { useParams } from "react-router-dom";
import { getHotel } from "../../Server/server";
import { useHotelsContext } from "../Context/HotelProvider";

function SingleHotel() {
  const { id } = useParams();

  const { setCurrentHotel, currentHotel, isLoading } = useHotelsContext();

  useEffect(() => {
    getHotel(id as string ).then((res) => {
      setCurrentHotel(res);
    });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div> please tRy again </div>
      ) : (
        <div className="room">
          <div className="roomDetails">
            <h2>{currentHotel?.name}</h2>
            <div>
              {currentHotel?.number_of_reviews} reviews &bull;{" "}
              {currentHotel?.smart_location}
            </div>
           <h2>  <img src={currentHotel?.xl_picture_url} alt={currentHotel?.name} /> </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleHotel;
