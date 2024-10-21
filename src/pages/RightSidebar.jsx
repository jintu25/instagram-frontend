import React from 'react'
import { useSelector } from 'react-redux';
import SuggestedUsers from './SuggestedUsers';

function RightSidebar() {
  const { user } = useSelector(store => store.auth)

  return (
    <div className="py-5">
      <div className='flex gap-2 items-center mb-2 pb-2 border-b border-slate-200'>
        <img
          src={user?.profilePicture || 'https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_1280.png'}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-sm my-4">
          <span className="font-semibold">{user?.username}</span> {user?.text}
        </p>
      </div>

      <div>
        <SuggestedUsers />
      </div>
    </div>

  )
}

export default RightSidebar