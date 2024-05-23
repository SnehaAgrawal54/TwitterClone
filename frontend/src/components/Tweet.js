import React from 'react'
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';

const Tweet = ({ tweet }) => {
    const { user } = useSelector(store => store.user);

    const dispatch = useDispatch();
    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);

        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }

    const deleteTweetHandler = async (id) => {
        try {
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
                withCredentials: true
            });
            console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <div className='border-b border-gray-200'>
            {/* <div> */}
            <div className='flex p-4'>
                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet?.userDetails?.[0]?.name}</h1>
                        <p className='text-sm text-gray-500 ml-1'>{`@${tweet?.userDetails?.[0]?.username}`}</p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    {/* icons */}
                    <div className='flex justify-between my-3'>
                        <div className='flex items-center hover:text-green-400'>
                            <div className='p-2 hover:bg-green-100 rounded-full cursor-pointer'>
                                <FaRegComment size='24px' />
                            </div>
                            <p>0</p>
                        </div>
                        <div className='flex items-center hover:text-pink-400'>
                            <div className='p-2 hover:bg-pink-100 rounded-full cursor-pointer' onClick={() => likeOrDislikeHandler(tweet?._id)}>
                                <FaRegHeart size='24px' />
                            </div>
                            <p>{tweet?.like?.length}</p>
                        </div>
                        <div className='flex items-center hover:text-yellow-400'>
                            <div className='p-2 hover:bg-yellow-50 rounded-full cursor-pointer'>
                                <FaRegBookmark size='24px' />
                            </div>
                            <p>0</p>
                        </div>
                        {
                            user?._id === tweet?.userId && (
                                <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                    <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                        <MdOutlineDeleteOutline size="24px" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Tweet