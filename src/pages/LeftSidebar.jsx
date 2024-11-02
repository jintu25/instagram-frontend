import React, { useState } from "react";
import { FiHome, FiSearch, FiCompass, FiUser } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { FaRegHeart, FaRegPlusSquare } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { MoreMenuBigScreen, MoreMenuSmallScreen } from "./MoreMenu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

const LeftSidebar = () => {
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const [activeMenu, setActiveMenu] = useState('/');
    const [showCreatePost, setShowCreatePost] = useState(false);
    const user = useSelector(store => store.auth);
    const navigate = useNavigate();


    const handleMenuClick = (menu) => {
        if (menu === '/create') {
            setShowCreatePost(true); // Show the create post modal
        } else {
            navigate(menu); // Navigate to the selected menu
        }
        setActiveMenu(menu); // Set active menu for styling
    };

    const closeModal = () => setShowCreatePost(false); // Close modal function

    return (
        <div>
            {/* Header for small screens (Instagram-like) */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-lg flex justify-between items-center p-4 z-50">
                <BsInstagram size={28} className="text-black" />
                <div className="flex space-x-4">
                    <FaRegHeart size={24} className="text-black" />
                    <AiOutlineMessage size={24} className="text-black" />
                </div>
            </div>

            {/* LeftSidebar for medium and larger screens */}
            <div className="hidden md:flex flex-col h-screen w-64 bg-gray-100 p-4 fixed top-0">
                <div className="flex items-center space-x-2 my-6">
                    <BsInstagram size={32} className="text-black" />
                    <span className="text-xl md:text-2xl font-bold">Instagram</span>
                </div>

                {/* Menu */}
                <ul className="space-y-6">
                    <Link
                        to="/"
                        onClick={() => handleMenuClick('/')}
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg ${activeMenu === '/' ? 'bg-gray-200' : ''}`}
                    >
                        <FiHome size={24} />
                        <span>Home</span>
                    </Link>

                    <li
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/search' ? 'bg-gray-200' : ''}`}
                    >
                        <FiSearch size={24} />
                        <span>Search</span>
                    </li>

                    <li
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/explore' ? 'bg-gray-200' : ''}`}
                    >
                        <FiCompass size={24} />
                        <span>Explore</span>
                    </li>

                    {/* Notifications Menu */}
                    <li className="relative flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer">
                        <FaRegHeart size={24} />
                        <span>Notifications</span>

                        {likeNotification.length > 0 && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="absolute right-2 top-2 rounded-full h-6 w-6 bg-slate-400 text-red-500 font-semibold flex items-center justify-center">
                                        {likeNotification?.filter(notification => notification?.userDetails.id !== user?.user?._id)?.length}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
                                    <ul>
                                        {likeNotification
                                            ?.filter(notification => notification?.userDetails?.id !== user?.user?._id) // Filter out self-likes
                                            .map((notification, index) => (
                                                <li key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md">
                                                    <img
                                                        src={notification.userDetails.profilePicture}
                                                        alt={`${notification.userDetails.username}'s profile`}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div>
                                                        <span className="font-semibold text-sm">{notification.userDetails.username}</span>
                                                        <p className="text-xs text-gray-600">{notification.message}</p>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </PopoverContent>
                            </Popover>
                        )}
                    </li>

                    <Link
                        to="/chat"
                        onClick={() => handleMenuClick('/messages')}
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/messages' ? 'bg-gray-200' : ''}`}
                    >
                        <AiOutlineMessage size={24} />
                        <span>Messages</span>
                    </Link>

                    <div onClick={() => handleMenuClick('/create')} className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/create' ? 'bg-gray-200' : ''}`}>
                        <FaRegPlusSquare size={24} />
                        <span>Create</span>
                    </div>

                    {showCreatePost && (
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <CreatePost closeModal={closeModal} />
                            </div>
                        </div>
                    )}

                    <Link
                        to={`/profile/${user?.user?._id}`}
                        onClick={() => handleMenuClick('/profile')}
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg ${activeMenu === '/profile' ? 'bg-gray-200' : ''}`}
                    >
                        <FiUser size={24} />
                        <span>Profile</span>
                    </Link>

                    <MoreMenuBigScreen />
                </ul>
            </div>

            {/* Bottom Navigation for small screens */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center px-2 py-4 z-50">
                <MoreMenuSmallScreen />
                <Link to="/" onClick={() => handleMenuClick('/')}>
                    <FiHome size={28} />
                </Link>
                <Link>
                    <FiSearch size={28} />
                </Link>
                <Link onClick={() => handleMenuClick('/create')} >
                    <FaRegPlusSquare size={28} />
                </Link>
                <Link>
                    <FiCompass size={28} />
                </Link>
                <Link to={`/profile/${user?.user?._id}`} onClick={() => handleMenuClick('/profile')}>
                    <FiUser size={28} />
                </Link>
            </div>
        </div>
    );
};

export default LeftSidebar;
