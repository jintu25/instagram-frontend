import { setPosts } from '@/redux/postSlice';
import { USER_API } from '@/utils/constant';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiMoreHorizontal, FiMessageCircle, FiSend, FiBookmark } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { author, caption, image, likes, comments } = post;
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLikes] = useState(post.likes.length);
  const [commentList, setCommentList] = useState(post.comments);
  const [bookmarked, setBookmarked] = useState(post?.bookmarks?.includes(post?._id) || false); // Bookmark state
  const dispatch = useDispatch();
  console.log(commentList)

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleOptionsModal = () => {
    setShowOptionsModal(!showOptionsModal);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${USER_API}/post/delete/${post._id}`, { withCredentials: true });
      if (res.data.success) {
        const updatedPost = posts.filter((postItem) => postItem?._id !== post?._id);
        dispatch(setPosts(updatedPost));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLikeOrDislike = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.get(`${USER_API}/post/${post._id}/${action}`, { withCredentials: true });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLikes(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? { ...p, likes: liked ? p.likes.filter((id) => id !== user._id) : [...p.likes, user._id] }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComments = async () => {
    if (!inputValue.trim()) {
      toast.error('Comment cannot be empty!');
      return;
    }
    try {
      const res = await axios.post(
        `${USER_API}/post/${post._id}/comment`,
        { text: inputValue },
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedCommentData = [...commentList, res.data.comment];
        setCommentList(updatedCommentData);
        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success('Comment added successfully!');
        setInputValue('');
      }
    } catch (error) {
      toast.error('Failed to add comment');
      console.log(error);
    }
  };

  const handleBookmarks = async () => {
    try {
      const res = await axios.get(`${USER_API}/post/${post?._id}/bookmark`, { withCredentials: true })
      console.log(res)
      if (res.data.success) {
        setBookmarked(!bookmarked);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to toggle bookmark");
      console.error(error);
    }

  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg min-w-full lg:max-w-lg mx-auto my-4 shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src={author.profilePicture || "https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_1280.png"} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div className="ml-4">
            <p className="text-sm font-semibold">{author?.username}</p>
          </div>
        </div>
        <button onClick={toggleOptionsModal}>
          <FiMoreHorizontal size={20} />
        </button>
      </div>
      <div>
        {/* Options Modal */}
        {showOptionsModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-4">
              {/* Unfollow */}
              <button
                className="w-full py-2 text-red-500 text-center font-semibold border-b"
              >
                UnFollow
              </button>

              {/* Add to Favorites */}
              <button
                className="w-full py-2 text-center font-semibold border-b"
              >
                Add to Favorites
              </button>

              {/* Delete (only show to post author) */}
              {user?._id === author._id && (
                <button
                  onClick={handleDelete}
                  className="w-full py-2 text-red-500 text-center font-semibold border-b"
                >
                  Delete
                </button>
              )}

              {/* Close Modal */}
              <button
                onClick={toggleOptionsModal}
                className="w-full py-2 text-center text-gray-500 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>

      <div className="w-full cursor-pointer" onClick={toggleModal}>
        <img src={image} alt="Post" className="w-full rounded-lg" />
      </div>

      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <button onClick={handleLikeOrDislike} className="like-button">
            {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
          </button>
          <button onClick={toggleModal}>
            <FiMessageCircle size={24} />
          </button>
          <button>
            <FiSend size={24} />
          </button>
        </div>
        <button onClick={handleBookmarks} >
          {
            bookmarked ? <FiBookmark size={24} className='text-blue-950' /> : <FiBookmark size={24} />
          }
        </button>
      </div>

      <div className="px-4">
        <p className="text-sm font-semibold">{postLike} likes</p>
      </div>

      <div className="px-4 my-2">
        <p className="text-sm">
          <span className="font-semibold">{author.username} </span>
          {caption}
        </p>
      </div>

      <div className="px-4 text-sm text-gray-500 cursor-pointer"
        onClick={
          toggleModal
        }
        
      >
        <p>View all {comments.length} comments</p>
      </div>

      <div className="flex items-center px-4 text-sm text-gray-500 py-4">
        <img src={user?.profilePicture || "https://via.placeholder.com/30"} alt="Avatar" className="w-8 h-8 rounded-full" />
        <input type="text" name="text" onChange={handleInputChange} value={inputValue} placeholder="Add a comment..." className="ml-4 flex-grow bg-transparent focus:outline-none text-sm" />
        <button onClick={handleComments} className="text-blue-500 text-sm font-semibold">Post</button>
      </div>

      {/* Modal for Enlarged Image and Comments */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full flex h-[90vh]">
            {/* Image Section */}
            <div className="relative w-1/2 h-full">
              <img
                src={image}
                alt="Post"
                className="w-full h-full object-cover rounded-l-lg"
              />
              <button
                className="absolute top-2 right-2 text-white text-3xl"
                onClick={toggleModal}
              >
                &times;
              </button>
            </div>

            {/* Comments Section */}
            <div className="flex flex-col w-1/2 h-full">
              <div className='flex items-center p-3 mb-2 border-b border-slate-200'>
                <img
                  src={user?.profilePicture || 'https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_1280.png'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <h2 className='ml-2'>{author?.username}</h2>
              </div>
              {/* Comments List */}
              <div className="flex-1 p-4 overflow-y-auto">
                {commentList.length > 0 ? (
                  commentList.map((com, index) => (
                    <div className='flex gap-2 items-center'>
                      <img
                        src={com?.author?.profilePicture || 'https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_1280.png'}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <p key={index} className="text-sm my-4">
                        <span className="font-semibold">{com?.author?.username}</span> {com.text}
                      </p>
                    </div>

                  ))
                ) : (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                )}
              </div>

              {/* Comment Input Field (Sticky at Bottom) */}
              <div className="p-4 border-t border-gray-300 flex items-center">
                <img
                  src={user?.profilePicture || 'https://via.placeholder.com/30'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <input
                  type="text"
                  name="comment"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Add a comment..."
                  className="ml-4 flex-grow bg-transparent focus:outline-none text-sm"
                />
                <button
                  onClick={handleComments}
                  className="text-blue-500 text-sm font-semibold"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Post;
