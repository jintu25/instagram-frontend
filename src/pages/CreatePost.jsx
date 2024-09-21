import { readAsDataURL } from '@/lib/utils';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ closeModal }) => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { posts } = useSelector(store => store.post)
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const dataUrl = await readAsDataURL(file); // Use the utility function
                setImage(file);
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('caption', description);
            formData.append('image', image); // File object

            // Sending FormData to the backend
            const res = await axios.post(
                'http://localhost:3000/api/v1/post/addpost',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts]))
                toast.success(res.data.message)
                closeModal();
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload Section */}
                <div>
                    {image ? (
                        <div className="mb-4">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                    ) : (
                        <label className="block mb-4">
                            <span className="sr-only">Upload Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </label>
                    )}
                </div>

                {/* Description Input */}
                <div>
                    <textarea
                        placeholder="Write a caption..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full resize-none h-24"
                    ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="modal-action flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-secondary btn-sm"
                        disabled={loading} // Disable button when loading
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`btn btn-primary btn-sm flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                {/* Loading Spinner */}
                                <ColorRing
                                    visible={true}
                                    height={30} // Reduced size for better button fit
                                    width={30}  // Reduced size for better button fit
                                    ariaLabel="color-ring-loading"
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                                {/* Loading Text */}
                                <span className="ml-2">Please wait...</span>
                            </div>
                        ) : (
                            'Post'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
