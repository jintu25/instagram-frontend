import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Mainlayout from "@/layout/Mainlayout";
import ChatPage from "@/pages/ChatPage";
import EditProfile from "@/pages/EditProfile";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/profile/:id",
                element: <Profile />
            },
            {
                path: "/account/edit",
                element: <EditProfile />
            },
            {
                path: "/chat",
                element: <ChatPage />
            },
        ]
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: < Login />
    }
])

export default router