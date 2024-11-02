import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Mainlayout from "@/layout/Mainlayout";
import ChatPage from "@/pages/ChatPage";
import EditProfile from "@/pages/EditProfile";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import ProtectRoute from "@/pages/ProtectRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectRoute><Mainlayout /> </ProtectRoute>,
        children: [
            {
                path: "/",
                element: <ProtectRoute><Home /></ProtectRoute> 
            },
            {
                path: "/profile/:id",
                element: <ProtectRoute><Profile /></ProtectRoute>
            },
            {
                path: "/account/edit",
                element: <ProtectRoute><EditProfile /></ProtectRoute>
            },
            {
                path: "/chat",
                element: <ProtectRoute><ChatPage /></ProtectRoute>
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