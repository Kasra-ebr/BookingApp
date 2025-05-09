import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'
import { useHotelsContext } from '../Context/HotelProvider'

function AppLayout() {
  const {hotels} = useHotelsContext()
  return (
    <div className='appLayOut'>
        <div className='sideBar'>
            <Outlet/>
        </div>
        <div className='mapContainer'>
          <Map  markerLocations={hotels}/>
        </div>
    </div>
  )
}

export default AppLayout