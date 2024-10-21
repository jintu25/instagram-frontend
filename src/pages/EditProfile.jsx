import { setAuthUser } from '@/redux/authSlice';
import axios from 'axios';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef(null);

    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    });
    const [imagePreview, setImagePreview] = useState(user?.profilePicture); // To store the preview image URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle profile picture change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInput({ ...input, profilePhoto: file });
            setImagePreview(URL.createObjectURL(file));  // Set the preview URL
        }
    };

    // Function to handle select input change
    const handleSelectChange = (e) => {
        setInput({ ...input, gender: e.target.value });
    };

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append('profilePicture', input.profilePhoto); // Backend expects 'profilePicture'
        formData.append('bio', input.bio);
        formData.append('gender', input.gender);

        try {
            setLoading(true);
            const res = await axios.post(
                'http://localhost:3000/api/v1/user/profile/edit',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true, // Send cookies with request
                }
            );

            if (res.data.success) {
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    profilePicture: res.data.user?.profilePicture, // Ensure correct field name
                    gender: res.data.user?.gender
                }
                // Update Redux store with new user data
                dispatch(setAuthUser(updatedUserData));
                // Navigate to user profile
                navigate(`/profile/${user?._id}`);
                // Show success message
                toast.success(res.data.message);
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            // Handle any errors that occurred during the request
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false); // Ensure loading is stopped whether success or error
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            {/* Header */}
            <h1 className='text-2xl font-semibold my-6'>Edit Profile</h1>
            <div className="flex items-center justify-between px-12 py-2 rounded-xl bg-slate-400 mb-8">
                <div className="relative">
                    {/* Show the image preview */}
                    <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-xl font-bold mb-1">{user?.username}</h1>
                    <input
                        type="file"
                        className="hidden"
                        ref={imageRef}
                        onChange={handleImageChange}
                    />
                    <button className="bg-sky-500 px-3 py-2 rounded-lg text-sm font-semibold text-white" onClick={() => imageRef.current.click()}>
                        Change Photo
                    </button>
                </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                {/* Bio */}
                <div className="flex flex-col space-y-1">
                    <label className="font-medium">Bio</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300"
                        placeholder="Add a bio"
                        rows="3"
                        name="bio"
                        value={input?.bio}
                        onChange={(e) => setInput({ ...input, bio: e.target.value })}
                    ></textarea>
                </div>

                {/* Gender */}
                <div className="flex flex-col space-y-1">
                    <label className="font-medium">Gender</label>
                    <select
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300"
                        value={input.gender}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        onClick={editProfileHandler}
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-medium transition-all ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
