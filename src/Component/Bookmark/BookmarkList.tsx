import React from "react";
import { useBookmarkContext } from "../Context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function BookmarkList() {
  const { bookmarks, isLoading } = useBookmarkContext();

  if (isLoading) return;
  return (
    <div >
      <h2>Bookmark List </h2>
      <div className="bookmark_list">
        {bookmarks?.map((item) => {
          return (
            <Link  key={item.id} to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <div className="bookmark_Item">
                <ReactCountryFlag svg countryCode={item?.countryCode} />
                <strong>{item?.cityName}</strong>
                <span>{item?.country}</span> 
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookmarkList;
