import React from 'react';
import { Link } from 'react-router-dom';

const Message = ({ selectedUser }) => {
    return (
        <div className="flex-1 p-4 overflow-y-auto">
            <div className='flex justify-center'>
                <div className=''>
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={selectedUser?.profilePicture} />
                        </div>
                    </div>
                    <p className='text-center font-semibold text-lg mb-2'>{selectedUser?.username}</p>
                    <Link to={`/profile/${selectedUser?._id}`} className='text-sm font-semibold bg-slate-400 px-3 py-2 rounded-sm'>View Profile</Link>
                </div>
            </div>
        </div>
    );
};

export default Message;
