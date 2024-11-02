import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from '@/redux/socketSlice';
import { setOnlineUsers } from '@/redux/chatSlice';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '@/pages/LeftSidebar';

function MainLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:3000", {
        query: { userId: user._id },
        transports: ["websocket"]
      });

      dispatch(setSocket(socketio));

      socketio.on("getOnlineUser", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketio.disconnect();
        dispatch(setSocket(null));
      };
    }
  }, [user, dispatch]);

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
