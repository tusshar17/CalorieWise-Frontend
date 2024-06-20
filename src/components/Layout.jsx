import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='bg-green-700 overflow-hidden min-h-screen' id='layout-div'>
        <Outlet/>
    </div>
  )
}

export default Layout