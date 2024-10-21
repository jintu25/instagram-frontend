import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SuggestedUsers() {
    const { suggestedUsers } = useSelector(store => store.auth)
    console.log(suggestedUsers)
    return (
        <div>
            {
                suggestedUsers.map((user) => (
                    <div key={user._id} className="flex items-center justify-between mb-4">
                        <Link to={`profile/${user?._id}`} className="flex items-center mb-3">
                            <img
                                src={user?.profilePicture}
                                alt={user?.username}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-sm font-semibold">{user?.username}</p>
                            </div>
                        </Link>
                        <button
                            className={`text-sm font-medium ${user?.isFollowing ? "text-gray-400" : "text-blue-500"}`}
                        >
                            {user.isFollowing ? "Following" : "Follow"}
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default SuggestedUsers
