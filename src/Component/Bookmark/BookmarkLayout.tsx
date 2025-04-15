import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'

import { useBookmarkContext } from '../Context/BookmarkProvider'

function BookmarkLayout() {
  const {bookmarks}= useBookmarkContext()
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