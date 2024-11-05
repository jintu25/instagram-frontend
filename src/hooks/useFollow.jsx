
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { followOrUnfollowUser } from '@/redux/authSlice';

const useFollow = (userId) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // Get the current follow status from Redux
    const isFollowing = useSelector((state) =>
        state.auth.userProfile?.followers.includes(state.auth.user?._id)
    );

    const toggleFollow = async () => {
        setLoading(true);
        await dispatch(followOrUnfollowUser(userId));
        setLoading(false);
    };

    return { isFollowing, toggleFollow, loading };
};

export default useFollow;
