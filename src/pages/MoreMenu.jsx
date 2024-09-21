import React, { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import { setPosts, setSelectedPost } from '@/redux/postSlice';

// More Menu for Big Screens
export const MoreMenuBigScreen = () => {
    const [isdark, setIsdark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth);

    // Move handleLogout inside the component
    const handleLogout = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/logout", {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null))
                dispatch(setPosts([]))
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDarkMode = () => {
        setIsdark(!isdark);
    };

    return (
        <div className="relative">
            {/* More Menu Button */}
            <li className="flex items-center space-x-4 mb-4 p-2 rounded-lg cursor-pointer" onClick={toggleMenu}>
                <IoMenu size={24} />
                <span>More</span>
            </li>

            {/* Pop-up Menu */}
            {isOpen && (
                <div className="absolute left-[100px] mt-[-100px] w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                    {/* Dark Mode Option */}
                    <div
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={toggleDarkMode}
                    >
                        {isdark ? (
                            <FiSun size={20} className="text-yellow-500" />
                        ) : (
                            <FiMoon size={20} className="text-gray-600" />
                        )}
                        <span>{isdark ? "Light Mode" : "Dark Mode"}</span>
                    </div>

                    {/* Logout Option */}
                    <div
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout} // Call the Logout function
                    >
                        <FiLogOut size={20} className="text-red-600" />
                        <span>Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// More Menu for Small Screens
export const MoreMenuSmallScreen = ({ darkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isdark, setIsdark] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth);

    // Move handleLogout inside the component
    const handleLogout = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/logout", {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* More Menu Button */}
            <li className="flex items-center space-x-4 cursor-pointer" onClick={toggleMenu}>
                <IoMenu size={28} />
            </li>

            {/* Pop-up Menu */}
            {isOpen && (
                <div className="absolute left-0 mt-[-140px] w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                    {/* Dark Mode Option */}
                    <div
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={toggleDarkMode}
                    >
                        {isdark ? (
                            <FiSun size={20} className="text-yellow-500" />
                        ) : (
                            <FiMoon size={20} className="text-gray-600" />
                        )}
                        <span>{isdark ? "Light Mode" : "Dark Mode"}</span>
                    </div>

                    {/* Logout Option */}
                    <div
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout} // Call the Logout function
                    >
                        <FiLogOut size={20} className="text-red-600" />
                        <span>Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};
