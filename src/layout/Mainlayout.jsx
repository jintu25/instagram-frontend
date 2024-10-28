import LeftSidebar from '@/pages/LeftSidebar'
import { setOnlineUsers } from '@/redux/chatSlice'
import { setLikeNotification } from '@/redux/RTNSlice'
import { setSocket } from '@/redux/socketSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { io } from 'socket.io-client'

function Mainlayout() {

  const { user } = useSelector(store => store.auth)
  const { socket } = useSelector(store => store.socketio)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:3000", {
        query: {
          userId: user?._id
        },
        transports: ["websocket"]
      });
      dispatch(setSocket(socketio))

      socketio.on("getOnlineUser", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null))
      };
    } else {
      socket.close();
      dispatch(setSocket(null))
    }

  }, [user, dispatch]);


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