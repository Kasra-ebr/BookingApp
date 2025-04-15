import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { IBookmark, IHotel } from "../../Type/Type";
import { useSearchParams } from "react-router-dom";

interface IPorvider {
  children: React.ReactNode;
}
interface IContext {
  bookmarks: IBookmark[] | null;
  error: string | null;
  isLoading: boolean;
  currentBookmark: IBookmark[] | null;
  setCurrentBookmark: React.Dispatch<React.SetStateAction<IBookmark[] | null>>;
}

const BookmarkContext = createContext<IContext>({
  bookmarks: null,
  error: null,
  isLoading: true,
  currentBookmark: null,
  setCurrentBookmark: () => {},
});

export const useBookmarkContext = () => {
  return useContext(BookmarkContext);
};

export function BookmarkContextProvider({ children }: IPorvider) {
  const { data: bookmarks, error, isLoading } = useFetch<IBookmark[]>();

  const [currentBookmark, setCurrentBookmark] = useState<IBookmark[] | null>(
    null
  );

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        error,
        currentBookmark,
        setCurrentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
