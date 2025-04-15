import React, { useEffect } from "react";
import { useBookmarkContext } from "../Context/BookmarkProvider";
import { getBookmarks } from "../../Server/server";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../ComponentProps/Button";

function SingleBookmark() {
  const { currentBookmark, isLoading, setCurrentBookmark } = useBookmarkContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmarks(id as string).then((res) => {
      setCurrentBookmark(res);
    });
  }, [id]);
  return (
    <div className="bookmark__container">
      <Button className="btn btn--back " onClick={() => navigate(-1)}>
        Back
      </Button>
      <span>{currentBookmark?.cityName}</span>
      <div className="single__bookmark">
        <p>
          {currentBookmark?.cityName} -- {currentBookmark?.country}
        </p>
      </div>
    </div>
  );
}

export default SingleBookmark;
