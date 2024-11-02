import useFollow from '../hooks/useFollow';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SuggestedUsers() {
    const { suggestedUsers } = useSelector(store => store.auth);

    return (
        <div>
            {suggestedUsers.map((user) => {
                const userId = user._id;
                const initialFollowStatus = user.isFollowing; // Using isFollowing from backend

                const { isFollowing, toggleFollow, loading } = useFollow(userId, initialFollowStatus);

                return (
                    <div key={userId} className="flex items-center justify-between mb-4">
                        <Link to={`profile/${userId}`} className="flex items-center mb-3">
                            <img
                                src={user.profilePicture}
                                alt={user.username}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-sm font-semibold">{user.username}</p>
                            </div>
                        </Link>
                        <button className='text-sky-500 font-semibold' onClick={toggleFollow} disabled={loading}>
                            {isFollowing ? 'UnFollow' : 'Follow'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default SuggestedUsers;
