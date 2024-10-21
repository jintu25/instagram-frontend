import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FiMessageCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '@/redux/authSlice';
import Message from './Message';


// ChatPage Component
const ChatPage = () => {
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const [newMessage, setNewMessage] = useState(""); // Input field for sending new messages
    const dispatch = useDispatch();

    // Handle selecting a conversation
    const handleSelectConversation = (user) => {
        dispatch(setSelectedUser(user)); // Set the selected user in Redux store
    };

    // Handle back button click to return to suggested users list
    const handleBack = () => {
        dispatch(setSelectedUser(null)); // Clear the selected conversation
    };

    // Handle sending a new message (placeholder for real-time functionality)
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Here, you would emit the new message to the server (via WebSockets)
            setNewMessage(''); // For now, we're just clearing the input
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 w-full md:w-9/12 md:ml-64 mt-16 mb-16 md:mt-0 md:mb-0">
            {/* Top Navbar */}
            <div className="w-full bg-white p-4 shadow-md flex items-center justify-between">
                {selectedUser ? (
                    <>
                        <AiOutlineArrowLeft
                            className="text-xl cursor-pointer"
                            onClick={handleBack}
                        />
                    </>
                ) : (
                    <h2 className="text-2xl font-semibold">Suggested Users</h2>
                )}
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar (Suggested Users) */}
                <div className={`w-full ${selectedUser ? 'hidden' : 'block'} md:block md:w-1/3 bg-white border-r overflow-y-auto`}>
                    <ul>
                        {suggestedUsers.map((user) => (
                            <li
                                key={user._id}
                                className="p-4 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSelectConversation(user)}
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={user.profilePicture}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{user.username}</h4>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {
                    selectedUser ? (
                        <section className='h-full flex flex-1 flex-col border-l border-l-gray-300'>
                            <div className='flex items-center gap-3 px-3 py-3 border-b border-b-gray-300 sticky top-0 z-10 bg-white'>
                                <div className="avatar">
                                    <div className="w-20 rounded-full">
                                        <img src={selectedUser?.profilePicture} />
                                    </div>
                                </div>
                                <h2>{selectedUser?.username}</h2>
                            </div>
                            <Message selectedUser={selectedUser} />
                            <div className='flex items-center p-4 border-t border-t-gray-400'>
                                <input className='mr-2 p-2 flex-1 focus-visible:ring-transparent rounded-sm' type="text" name="message" id="message" placeholder='Message...' />
                                <button className='bg-sky-400 text-white font-semibold px-3 py-2 rounded-sm'>Send</button>
                            </div>
                        </section>
                    ) : (
                        <div className="flex items-center justify-center h-full w-full">
                            <div className='text-center'>
                                <p className='flex text-5xl font-semibold justify-center'><FiMessageCircle /></p>
                                <h1 className='text-3xl font-semibold my-2'>Your messages</h1>
                                <h2 className="text-sm text-gray-400">Send a message to start a chat.</h2>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ChatPage;
