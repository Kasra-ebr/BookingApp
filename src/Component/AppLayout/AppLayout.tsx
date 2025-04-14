import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className='appLayOut'>
        <div className='sideBar'>
            <Outlet/>
        </div>
        <div className='mapContainer'>mapasd</div>
    </div>
  )
}

export default AppLayout