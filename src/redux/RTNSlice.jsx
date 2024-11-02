import { createSlice } from "@reduxjs/toolkit";

const RTNSlice = createSlice({
    name: "realTimeNotification",
    initialState: {
        likeNotification: []
    },
    reducers: {
        setLikeNotification: (state, action) => {
            const { type, userId, postId } = action.payload;

            // Handle "like" notifications
            if (type === "like") {
                // Check if the notification already exists to prevent duplicates
                const exists = state.likeNotification.some(
                    (item) => item.userId === userId && item.postId === postId
                );
                if (!exists) {
                    state.likeNotification.push(action.payload);
                }
            }

            // Handle "dislike" notifications by removing the existing like
            else if (type === "dislike") {
                state.likeNotification = state.likeNotification.filter(
                    (item) => item.userId !== userId || item.postId !== postId
                );
            }
        }
    }
});

// Action export
export const { setLikeNotification } = RTNSlice.actions;

// Reducer export
export default RTNSlice.reducer;
