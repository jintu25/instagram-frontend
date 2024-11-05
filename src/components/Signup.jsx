import React, { useState } from 'react'
import { Input } from './ui/input'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { USER_API } from '@/utils/constant';

function Signup() {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const changeEventHandler = (e) => {
   setInput({...input, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API}/user/register`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message, {
          position: 'top-center', // You can adjust the position
        });
        setInput({
          username: '',
          email: '',
          password: '',
        })
        navigate("/login")
      } 
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      <div className='w-full md:w-3/4 lg:w-2/5 m-auto justify-center text-center shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-8 py-16 rounded-md'>
        <form onSubmit={handleSubmit} className=''>
          <div>
            <h2 className='text-3xl font-system-ui'>Instagram</h2>
            <p className='text-gl font-normal my-3'>Sign up to see photos and videos from your friends</p>
          </div>
          <div className='text-start'>
            <span>Username</span>
            <Input
              className="my-2 focus-visible:ring-transparent"
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              placeholder="Username" 
            />
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
          <button type='submit' className="btn btn-success w-full my-3 text-white text-lg flex items-center justify-center">
            {loading ? (
              <>
                <ColorRing
                  visible={true}
                  height="24" // Set a smaller height for the spinner
                  width="24"  // Set a smaller width for the spinner
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{ marginRight: '10px' }} // Add some spacing between spinner and text
                  wrapperClass="color-ring-wrapper"
                  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
                Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
          <p className='text-lg '>Already have an account <Link to="/login" className='text-sky-600 font-semibold underline'>Please Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup