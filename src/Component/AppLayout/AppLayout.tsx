import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
        <div>
            <Outlet/>
        </div>
        <div>map</div>
    </div>
  )
}

export default AppLayout