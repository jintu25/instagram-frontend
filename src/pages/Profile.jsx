import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import useFollow from '../hooks/useFollow';
import { MdSlowMotionVideo } from "react-icons/md";
import { FaComment, FaHeart, FaRegBookmark } from 'react-icons/fa';
import { PiUserSquare } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";

function Profile() {
  const params = useParams();
  const userId = params.id;
  const dispatch = useDispatch();

  // Fetch user profile data
  useGetUserProfile(userId);
  const { userProfile, user } = useSelector((store) => store.auth);
  const initialFollowStatus = userProfile && userProfile.followers.includes(user._id);

  const { isFollowing, toggleFollow, loading } = useFollow(userId, initialFollowStatus);

  const isUserProfile = userProfile?._id === user?._id;
  const [activeMenu, setActiveMenu] = useState('Posts');

  useEffect(() => {
    if (isFollowing !== initialFollowStatus) {
      // Re-fetch user profile data to reflect updated follow status
      // dispatch(fetchUserProfile(userId));
    }
  }, [isFollowing, initialFollowStatus, dispatch, userId]);

  const handleMenuClick = (menu) => setActiveMenu(menu);


  return (
    <div className="w-full md:w-8/12 md:ml-64 mt-16 mb-16 md:mt-0 md:mb-0 px-10">
      <div>
        {userProfile ? (
          <div className="px-4 py-8 md:px-8 md:py-12 lg:px-20 lg:py-16">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="avatar flex-shrink-0">
                <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border border-gray-300 overflow-hidden">
                  <img
                    src={userProfile.profilePicture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt={`${userProfile.username}'s Avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full md:w-auto">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4">
                  <h2 className="text-slate-700 text-2xl font-semibold">{userProfile.username}</h2>
                  <div className="flex flex-wrap gap-2">
                    {isUserProfile ? (
                      <>
                        <Link to="/account/edit" className="bg-slate-500 text-white px-3 text-sm py-2 rounded-lg hover:bg-slate-600 transition-all">
                          Edit Profile
                        </Link>
                        <button className="bg-slate-500 text-white px-3 text-sm py-2 rounded-lg hover:bg-slate-600 transition-all">
                          View Archive
                        </button>
                        <button className="bg-slate-500 text-white px-3 text-sm py-2 rounded-lg hover:bg-slate-600 transition-all">
                          Ad Tools
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-slate-50 bg-sky-400 px-2 py-1 rounded-lg font-semibold"
                        onClick={toggleFollow} disabled={loading}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between w-full md:w-auto md:gap-8">
                  <div className="text-center md:text-left">
                    <span className="font-semibold">{userProfile?.posts?.length || 0}</span> posts
                  </div>
                  <div className="text-center md:text-left">
                    <span className="font-semibold">{userProfile?.followers?.length || 0}</span> followers
                  </div>
                  <div className="text-center md:text-left">
                    <span className="font-semibold">{userProfile?.following?.length || 0}</span> following
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-600">{userProfile?.bio || "No bio is available."}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <div className="mt-10 border-t border-gray-300">
        <div className="mt-2">
          <div className="flex justify-center gap-6">
            {['Posts', 'Reels', 'Saved', 'Tagged'].map((menu) => (
              <p
                key={menu}
                className={`flex items-center gap-1 cursor-pointer ${activeMenu === menu ? 'font-bold text-sky-500' : ''}`}
                onClick={() => handleMenuClick(menu)}
              >
                {menu === 'Posts' && <CgMenuGridR />}
                {menu === 'Reels' && <MdSlowMotionVideo />}
                {menu === 'Saved' && <FaRegBookmark />}
                {menu === 'Tagged' && <PiUserSquare />}
                {menu}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-1 my-4">
            {activeMenu === 'Posts' &&
              userProfile?.posts?.map((post) => (
                <div key={post._id} className="relative w-full aspect-square group">
                  <img src={post.image} alt="post image" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-lg flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaHeart />
                        <span>{post.likes.length}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaComment />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {activeMenu === 'Saved' &&
              userProfile?.bookmarks?.map((post) => (
                <div key={post._id} className="relative w-full aspect-square group">
                  <img src={post.image} alt="saved post image" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-lg flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaHeart />
                        <span>{post.likes.length}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaComment />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
