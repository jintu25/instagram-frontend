// HomePage.jsx
import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Posts from "./Posts";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";
import useGetAllPost from "@/hooks/useGetAllPost";
import useSuggestedUsers from "@/hooks/useSuggestedUsers";

const Home = () => {
  useGetAllPost()
  useSuggestedUsers()
  return (
    <div className="flex">
      {/* Feed Section */}
      <div className="w-full md:w-8/12  md:ml-64 gap-4 mt-16 mb-16 md:mt-0 md:mb-0 px-4">
        <Feed />
        <Outlet />
      </div>

      {/* Right Sidebar - only visible on medium (md) and larger screens */}
      <div className="hidden lg:block lg:w-4/12 px-4">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home; 
