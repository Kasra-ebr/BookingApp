import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header/Header";
import LocationList from "./Component/LocationnList/LocationList";
import AppLayout from "./Component/AppLayout/AppLayout";
import Hotels from "./Component/Hotels/Hotels";
import { HotelContextProvider } from "./Component/Context/HotelProvider";
import SingleHotel from "./Component/SingleHotel.tsx/SingleHotel";
import BookmarkLayout from "./Component/Bookmark/BookmarkLayout";

import Bookmark from "./Component/Bookmark/Bookmark";
import SingleBookmark from "./Component/Bookmark/SingleBookmark";

import { BookmarkContextProvider } from "./Component/Context/BookmarkProvider";
import AddNewBookmark from "./Component/AddNewBookmark/AddNewBookmark";

function App() {
  return (
    <BookmarkContextProvider>
      <HotelContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />}>
            <Route index element={<Bookmark />} />
            <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
        </Routes>
      </HotelContextProvider>
    </BookmarkContextProvider>
  );
}

export default App;
