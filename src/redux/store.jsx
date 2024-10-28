import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { combineReducers } from 'redux';
import authSlice from './authSlice';
import postSlice from './postSlice';
import socketSlice from "./socketSlice"
import chatSlice from "./chatSlice"
import RTNSlice from "./RTNSlice"
// Combine your reducers
const rootReducer = combineReducers({
    auth:authSlice ,
    post: postSlice,
    socketio: socketSlice,
    chat: chatSlice,
    realTimeNotification: RTNSlice
    // Add other reducers here
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage, // You can use other storage options like sessionStorage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store using the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disables serializability checks for certain non-serializable data like Promises
        }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
