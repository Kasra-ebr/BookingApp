import React, { createContext, useContext, useEffect, useState } from "react";
import { IBookmark } from "../../Type/Type";
import { deleteBookmarkByIds, getBookmark, postCreateBookmark } from "../../Server/server";

// Define interfaces for Context
interface IProvider {
  children: React.ReactNode;
}

interface IContext {
  bookmarks: IBookmark[] | null;
  error: string | null;
  isLoading: boolean;
  currentBookmark: IBookmark | null;
  setCurrentBookmark: React.Dispatch<React.SetStateAction<IBookmark | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBookmarks: React.Dispatch<React.SetStateAction<IBookmark[] | null>>;
  deleteBookmark: (id: string) => void;
  createBookmark: (newBookmark: IBookmark) => void;
}

// Create BookmarkContext
const BookmarkContext = createContext<IContext>({
  bookmarks: null,
  error: null,
  isLoading: true,
  currentBookmark: null,
  setIsLoading: () => {},
  setBookmarks: () => {},
  setCurrentBookmark: () => {},
  deleteBookmark: () => {},
  createBookmark: () => {},
});

export function useBookmark() {
  return useContext(BookmarkContext);
}

export function BookmarkContextProvider({ children }: IProvider) {
  const [bookmarks, setBookmarks] = useState<IBookmark[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBookmark, setCurrentBookmark] = useState<IBookmark | null>(null);

  // Fetch bookmarks on mount
  useEffect(() => {
    getBookmark()
      .then((res) => {
        setBookmarks(res);
        console.log(res, "Fetched bookmarks");  // log the fetched data
      })
      .catch(() => {
        setError("Failed to fetch bookmarks.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Function to create a new bookmark
  function createBookmark(newBookmark: IBookmark) {
    setIsLoading(true);
    setError(null);

    postCreateBookmark(newBookmark)
      .then((res) => {
        setBookmarks((prev) => [...(prev || []), res]);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Function to delete a bookmark by ID
  function deleteBookmark(id: string) {
    setIsLoading(true);
    setError(null);

    deleteBookmarkByIds(id)
      .then(() => {
        setBookmarks((prev) => prev?.filter((b) => b.id !== id) || null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        error,
        isLoading,
        currentBookmark,
        setCurrentBookmark,
        setBookmarks,
        setIsLoading,
        deleteBookmark,
        createBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
