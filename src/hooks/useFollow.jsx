// src/hooks/useFollow.js
import { followOrUnfollowUser } from '@/redux/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useFollow = (userId, initialFollowStatus) => {
    const dispatch = useDispatch();
    const [isFollowing, setIsFollowing] = useState(initialFollowStatus);
    const [loading, setLoading] = useState(false);

    const toggleFollow = async () => {
        setLoading(true);
        await dispatch(followOrUnfollowUser(userId));
        setIsFollowing((prev) => !prev);
        setLoading(false);
    };

    return { isFollowing, toggleFollow, loading };
};

export default useFollow;
