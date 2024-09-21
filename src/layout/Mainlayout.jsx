import LeftSidebar from '@/pages/LeftSidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Mainlayout() {
  return (
    <div className="flex">
      {/* Left Sidebar - Always visible */}
      <div>
        <LeftSidebar />
      </div>

      {/* Content Area - Changes based on the route */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Mainlayout