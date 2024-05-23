import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import Avatar from 'react-avatar';
import useGetProfile from '../hooks/useGetProfile'
import { useSelector,useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';


const Profile = () => {
  const { user, profile } = useSelector(store => store.user)
  const { id } = useParams()
  useGetProfile(id)
  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    if(user.following.includes(id)){
        // unfollow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }else{
        // follow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}

  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
      <div>
        {/* name,no of post */}
        <div className='flex items-center py-2'>
          <Link to='/' className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
            <IoArrowBack size='24px' />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>{profile?.name}</h1>
            <p className='text-sm text-gray-500'>10 post</p>
          </div>
        </div>
        {/* banner */}
        <img src='https://marketplace.canva.com/EAFK_XV_Ht8/1/0/1600w/canva-black-typographic-retro-moon-and-astronaut-twitter-header-0NTqoXhUtsE.jpg' alt='banner' />
        {/* phot0 */}
        <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
          <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
        </div>
        {/* edit btn */}
        <div className='m-4 text-right'>
          {
            profile?._id === user?._id ? (
              <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

            ) : (
              <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
            )
          }
        </div>
        {/* name */}
        <div className='m-4'>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        {/* bio */}
        <div className='m-4 text-sm'>
          <p>😀Exploring the world || 😀Exploring the world || 😀Exploring the world || 😀Exploring the world</p>
        </div>
      </div>
    </div>
  )
}

export default Profile