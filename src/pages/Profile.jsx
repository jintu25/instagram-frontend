import React from 'react'

function Profile() {
  return (
    <div className='w-full md:w-8/12  md:ml-64 gap-4 mt-16 mb-16 md:mt-0 md:mb-0 px-4'>
      <div className='flex'>
        <div className="image"></div>
        <div className="details">
          <div className='flex gap-4'>
            <h2>username</h2>
            <button>Edit Profile</button>
            <button>View archive</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile