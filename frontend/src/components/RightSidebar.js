import React from 'react'
import Avatar from 'react-avatar';
import { IoSearch } from "react-icons/io5";
import { useSelector } from 'react-redux'
import useGetOtherUser from '../hooks/useGetOtherUser'
import {Link} from 'react-router-dom'

const RightSidebar = () => {
  const { user, otherUser } = useSelector(store => store.user)

  useGetOtherUser(user?._id)

  return (
    <div className='w-[25%]'>
      {/* search */}
      <div className='flex items-center p-3 rounded-full outline-none bg-gray-100'>
        <IoSearch size='20px' className='text-gray-500' />
        <input type='text' placeholder='Search' className='bg-transparent outline-none px-2' />
      </div>
      {/* who to follow */}
      <div className='p-4 my-4 rounded-2xl bg-gray-100'>
        <h1 className='font-bold text-lg'>Who to follow</h1>

        {
          otherUser?.map((user) => {
            return (
              // user
              <div key={user?._id} className='flex items-center justify-between my-4'>
                {/* image,name */}
                <div className='flex'>
                  <div>
                    <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                  </div>
                  <div className='ml-2'>
                    <h1 className='font-bold'>{user?.name}</h1>
                    <p className='text-sm'>{`@${user?.username}`}</p>
                  </div>
                </div>
                {/* Profile button */}
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className='px-4 py-1 rounded-full bg-black text-white'>Profile</button>
                  </Link>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RightSidebar