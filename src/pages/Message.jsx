import useChatRTM from '@/hooks/useChatRTM';
import useGetMessages from '@/hooks/useGetMessages';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Message = () => {
    useChatRTM();
    useGetMessages();
    const { user, selectedUser } = useSelector(store => store.auth);
    const { messages } = useSelector(store => store.chat);

    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {/* Profile Section */}
            <div className='flex justify-center'>
                <div className=''>
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={selectedUser?.profilePicture} alt="Profile" />
                        </div>
                    </div>
                    <p className='text-center font-semibold text-lg mb-2'>{selectedUser?.username}</p>
                    <Link to={`/profile/${selectedUser?._id}`} className='text-sm font-semibold bg-slate-400 px-3 py-2 rounded-sm'>
                        View Profile
                    </Link>
                </div>
            </div>

            {/* Messages Section */}
            <div className="mt-8 space-y-4">
                {messages?.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`inline-block max-w-xs p-3 rounded-lg ${msg.senderId === user?._id ? 'bg-sky-400 text-white' : 'bg-gray-300'}`}
                        >
                            <span>{msg.message}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Message;
