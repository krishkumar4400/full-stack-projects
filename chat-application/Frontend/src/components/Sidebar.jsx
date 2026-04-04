import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Sidebar = ({selectedUser, setSelectedUser}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-[#8185B2]/5 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-8 right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block group-active:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>
        <div className="flex items-center my-5 gap-2 rounded-full py-2 px-4 bg-[#282142] text-white">
          <img src={assets.search_icon} className="w-4" alt="Search" />
          <input
            type="text"
            placeholder="Search People"
            className=" outline-0 w-full bg-transparent border-0 text-sm placeholder-[#c8c8c8] flex-1"
          />
        </div>

        <div className=' flex flex-col gap-3'>  
          {
            userDummyData.map((user,index) => (
              <div onClick={() => {setSelectedUser(user)}} key={index} className={`flex  items-center gap-2 p-2 pl-4 max-sm:text-sm rounded relative ${selectedUser?._id === user._id && 'bg-[#282142]/50' }`}>
                <img src={user?.profilePic || assets.avatar_icon} alt="user icon" className='w-14 aspect-square rounded-full cursor-pointer' />
                <div className=' flex flex-col leading-5 caret-neutral-50 cursor-pointer'>
                  <p className='text-sm font-light'>
                    {user.fullName}
                  </p> 
                  {
                    index < 3 ? <span className='text-green-400 text-xs'>online</span> : <span className='text-xs text-neutral-400'>offline</span>
                  }
                </div>
                {
                  index > 2 && <p className='alsolute top-4 right-4 text-xs h-6 w-6 flex justify-center items-center rounded-full bg-violet-600'> {index} </p>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Sidebar
