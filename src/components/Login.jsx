import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import { USER_API } from '@/utils/constant';
import { Watch } from 'react-loader-spinner';

function Login() {
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API}/user/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                navigate("/")
                toast.success(res.data.message, {
                    position: 'top-center', // You can adjust the position
                });
                setInput({
                    username: '',
                    email: '',
                    password: '',
                })
                
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    };
    return (

        <div className='flex h-screen w-screen justify-center items-center'>
            {loading ? (
                <div className='flex justify-center bg-white'>
                    <Watch
                        visible={true}
                        height="80"
                        width="80"
                        radius="48"
                        color="#4fa94d"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div> // Show loading spinner or message
            ) : (
            <div className='w-full md:w-3/4 lg:w-2/5 m-auto justify-center text-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-8 py-16 rounded-md'>

                <form onSubmit={handleSubmit} className=''>
                    <div>
                        <h2 className='text-3xl font-system-ui'>Instagram</h2>
                        <p className='text-gl font-normal my-3'>Sign up to see photos and videos from your friends</p>
                    </div>
                    <div className='text-start'>
                        <span>Email</span>
                        <Input
                            className="my-2 focus-visible:ring-transparent"
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Email"
                        />
                    </div>
                    <div className='text-start'>
                        <span>Password</span>
                        <Input
                            className="my-2 focus-visible:ring-transparent"
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success w-full my-5 text-white text-lg"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                    <p className=''>Don't have an account please<Link className='text-sky-600 font-semibold' to="/signup"> SignUp</Link></p>
                        </form>
            </div>
            )}
        </div>
    )
}

export default Login