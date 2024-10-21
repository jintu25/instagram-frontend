import React, { useState } from "react";
import { FiHome, FiSearch, FiCompass, FiUser } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs"; // Instagram logo from react-icons
import { FaRegHeart, FaRegPlusSquare } from "react-icons/fa";
// import { IoMenu } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MoreMenuBigScreen, MoreMenuSmallScreen } from "./MoreMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";

const LeftSidebar = () => {
    const [activeMenu, setActiveMenu] = useState('/'); // Default to Home menu
    const [showCreatePost, setShowCreatePost] = useState(false);
    const user = useSelector((store) => store.auth);
    // console.log(user.user._id)

    const handleMenuClick = (menu) => {
        if (menu === '/create') {
            setShowCreatePost(true); // Show the create post modal
        }
        setActiveMenu(menu); // Set active menu for styling
    };

    // Function to close the modal
    const closeModal = () => {
        setShowCreatePost(false);
    };
 
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
                {/* Logo at the top */}
                <div className="flex items-center space-x-2 my-6">
                    <BsInstagram size={32} className="text-black" />
                    <span className="text-xl md:text-2xl font-bold instagram-logo">Instagram</span>
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
                        onClick={() => handleMenuClick('/search')}
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/search' ? 'bg-gray-200' : ''}`}
                    >
                        <FiSearch size={24} />
                        <span>Search</span>
                    </li>

                    <li
                        onClick={() => handleMenuClick('/explore')}
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/explore' ? 'bg-gray-200' : ''}`}
                    >
                        <FiCompass size={24} />
                        <span>Explore</span>
                    </li>

                    <li
                        onClick={() => handleMenuClick('/notifications')}
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/notifications' ? 'bg-gray-200' : ''}`}
                    >
                        <FaRegHeart size={24} />
                        <span>Notifications</span>
                    </li>

                    <Link
                        to="/chat"
                        onClick={() => handleMenuClick('/messages')}
                        className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/messages' ? 'bg-gray-200' : ''}`}
                    >
                        <AiOutlineMessage size={24} />
                        <span>Messages</span>
                    </Link>

                    <div>
                        <div
                            onClick={() => handleMenuClick('/create')}
                            className={`flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer ${activeMenu === '/create' ? 'bg-gray-200' : ''}`}
                        >
                            <FaRegPlusSquare className="hidden md:block" size={24} />
                            <span>Create</span>
                        </div>

                        {/* DaisyUI Modal */}
                        {showCreatePost && (
                            <div className="modal modal-open">
                                <div className="modal-box">
                                    <CreatePost closeModal={closeModal} /> {/* Your create post component */}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        to={`profile/${user?.user?._id}`}
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
                <FiHome size={28} />
                <FiSearch size={28} />
                <div>
                    {/* Main menu item */}
                    <div className="flex justify-center items-center"
                        onClick={() => handleMenuClick('/create')}
                    >
                        {/* Icon for small devices */}
                        <FaRegPlusSquare
                            className="md:hidden block"
                            size={28}
                            onClick={() => handleMenuClick('/create')} // Handle click on the icon
                        />
                    </div>

                    {/* DaisyUI Modal */}
                    {showCreatePost && (
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <CreatePost closeModal={closeModal} /> {/* Your create post component */}
                            </div>
                        </div>
                    )}
                </div>
                <FiCompass size={28} />
                <FiUser size={28} />
            </div>
        </div>
    );
};

export default LeftSidebar;
