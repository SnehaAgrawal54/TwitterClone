import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { getMyProfile, getOtherUser, getUser } from '../redux/userSlice';


const LeftSidebar = () => {
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUser(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-[20%]'>
            {/* <div> */}
            {/* logo */}
            <div>
                <FaXTwitter size='32px' className='ml-4' />
            </div>
            {/* others */}
            <div className='my-4'>
                <Link to='/' className='flex items-center my-2 px-4 py-2 rounded-full hover:cursor-pointer hover:bg-gray-200'>
                    <GoHomeFill size='24px' />
                    <h1 className='font-bold text-lg ml-2'>Home</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 rounded-full hover:cursor-pointer hover:bg-gray-200'>
                    <IoSearch size='24px' />
                    <h1 className='font-bold text-lg ml-2'>Explore</h1>
                </div>
                <div className='flex items-center my-2 px-4 py-2 rounded-full hover:cursor-pointer hover:bg-gray-200'>
                    <IoNotificationsOutline size='24px' />
                    <h1 className='font-bold text-lg ml-2'>Notifications</h1>
                </div>
                <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 rounded-full hover:cursor-pointer hover:bg-gray-200'>
                    <FaRegUser size='24px' />
                    <h1 className='font-bold text-lg ml-2'>Profile</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 rounded-full hover:cursor-pointer hover:bg-gray-200'>
                    <FaRegBookmark size='24px' />
                    <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                </div>
                <div className='flex items-center my-2 px-4 py-2 rounded-full hover:cursor-pointer hover:bg-gray-200' onClick={logoutHandler}>
                    <AiOutlineLogout size='24px' />
                    <h1 className='font-bold text-lg ml-2'>Logout</h1>
                </div>
                <button className='px-4 py-2 w-full rounded-full border-none bg-[#1D98F0] text-white font-bold'>
                    Post
                </button>
            </div>
            {/* </div> */}
        </div>
    )
}

export default LeftSidebar