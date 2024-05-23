import React, { useState } from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice.js';

const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLoginPage) {
      // login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });

        dispatch(getUser(res?.data?.user));
        
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/signup`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });

        if (res.data.success) {
          setIsLoginPage(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  }

  const loginSignupHandler = () => {
    setIsLoginPage(!isLoginPage);
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        {/* logo */}
        <div>
          <FaXTwitter size='300px' />
        </div>
        {/* form */}
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLoginPage ? "Login" : "Signup"}</h1>
          <form className='flex flex-col w-[70%]' onSubmit={submitHandler} >
            {
              !isLoginPage && (
                <>
                  <input type='text' placeholder='Name'
                    className='px-3 py-2 my-1 rounded-full font-semibold outline-blue-400 border border-gray-400'
                    value={name} onChange={(e) => setName(e.target.value)} />
                  <input type='text' placeholder='Username'
                    className='px-3 py-2 my-1 rounded-full font-semibold outline-blue-400 border border-gray-400'
                    value={username} onChange={(e) => setUsername(e.target.value)} />
                </>
              )
            }

            <input type='email' placeholder='Email'
              className='px-3 py-2 my-1 rounded-full font-semibold outline-blue-400 border border-gray-400'
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password'
              className='px-3 py-2 my-1 rounded-full font-semibold outline-blue-400 border border-gray-400'
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className='py-2 my-2 rounded-full border-none text-lg text-white bg-[#1D9BF0]'>{isLoginPage ? "Login" : "Create Account"}</button>

            <h1>
              {isLoginPage ? "Do not have an account? " : "Already have an account? "}
              <span className='font-bold text-blue-500 cursor-pointer' onClick={loginSignupHandler}>{isLoginPage ? "Signup" : "Login"}</span>
            </h1>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

