// src/redux/slices/userSlice.js
import { USER_API } from '@/utils/constant';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        suggestedUsers: [],
        userProfile: null,
        selectedUser: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        followUser: (state, action) => {
            if (state.user && !state.user.following.includes(action.payload)) {
                state.user.following.push(action.payload);
            }
            // Optionally update userProfile and suggestedUsers
            if (state.userProfile && state.userProfile._id === action.payload) {
                state.userProfile.followers.push(state.user._id);
            }
        },
        unfollowUser: (state, action) => {
            if (state.user) {
                state.user.following = state.user.following.filter(id => id !== action.payload);
            }
            if (state.userProfile && state.userProfile._id === action.payload) {
                state.userProfile.followers = state.userProfile.followers.filter(id => id !== state.user._id);
            }
        },
    },
});

// Export actions
export const {
    setAuthUser,
    setSuggestedUsers,
    setUserProfile,
    setSelectedUser,
    followUser,
    unfollowUser
} = authSlice.actions;

// Thunk for follow/unfollow API call
export const followOrUnfollowUser = (userId) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${USER_API}/user/followorunfollow/${userId}`, // Assuming a proxy setup in package.json
            {},
            { withCredentials: true }
        );
        // Dispatch follow or unfollow based on the response action
        if (response.data.action === 'follow') {
            dispatch(followUser(userId));
        } else if (response.data.action === 'unfollow') {
            dispatch(unfollowUser(userId));
        }
    } catch (error) {
        console.error("Error in follow/unfollow:", error);
        // Optionally, dispatch an error action or handle the error in the UI
    }
};

export default authSlice.reducer;
