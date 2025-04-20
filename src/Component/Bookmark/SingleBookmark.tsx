import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkProvider";
import { useEffect } from "react";
import { getBookmarks } from "../../Server/server";
import Button from "../ComponentProps/Button";


function SingleBookmark() {
  const { currentBookmark, setIsLoading, setCurrentBookmark } =
  useBookmark();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmarks(id as string)
      .then((res) => {
        setIsLoading(true);
        setCurrentBookmark(res);
      })
      .catch((err) => console.error("Bookmark creation failed:", err))
      .finally(() => setIsLoading(false));
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
