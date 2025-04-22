import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { useBookmark } from '../Context/BookmarkProvider';
import './../../App.css';
import Button from '../ComponentProps/Button';
import { HiTrash } from 'react-icons/hi';
import { BiLoader } from 'react-icons/bi';

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } = useBookmark();
  const navigate = useNavigate();

  // Handle delete bookmark action
  const handleDelete = async (e, id: string) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  // Show loading spinner while data is loading
  if (isLoading) return <BiLoader />;

  // Show message when no bookmarks are available
  if (!bookmarks?.length) return (
    <div>
      <div className="bookmarkHeader">
        <h2>Bookmark List</h2>
        <Button className="btn btn--primary" onClick={() => navigate("/bookmark/add")}>
          + Add New Bookmark
        </Button>
      </div>
      <p>There are no bookmarked locations.</p>
    </div>
  );

  return (
    <div>
     
     <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks?.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <Button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </Button>
              </div>
            </Link>
          );
        })}
      </div>


      <div className="bookmarkHeader">
     
        <Button className="btn btn--primary" onClick={() => navigate("/bookmark/add")}>
          + Add New Bookmark
        </Button>
      </div>
    </div>
  );
}

export default Bookmark;
