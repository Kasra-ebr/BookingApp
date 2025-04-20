import React from "react";
import { useBookmark, useBookmarkContext } from "../Context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import Button from "../ComponentProps/Button";
import { FaTrash } from "react-icons/fa";

function BookmarkList() {
  const { bookmarks, isLoading,setBookmarks } = useBookmark();
  bookmarks
  if (isLoading) return;

  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  };
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
                <div>
                  <Button onClick={()=> handleDelete(item.id as string)}>
                      <FaTrash/>
                  </Button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookmarkList;
