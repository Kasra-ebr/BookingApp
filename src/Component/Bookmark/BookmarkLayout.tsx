import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'
import { useBookmark } from '../Context/BookmarkProvider'



function BookmarkLayout() {
  const {bookmarks}= useBookmark()
  return (
    <div className='appLayOut'>
        <div className='sideBar'>
            <Outlet/>
        </div>
        <div className='mapContainer'>
          <Map  markerLocations={bookmarks}/>
        </div>
    </div>
  )
}

export default BookmarkLayout