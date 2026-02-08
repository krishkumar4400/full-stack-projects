import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { AppContent } from '../context/AppContext.jsx'

const Header = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className="flex flex-col items-center mt-20 text-center text-gray-800 px-4">
      <img
        src={assets.header_img}
        className="w-36 h-36 rounded-full mb-6"
        alt=""
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}{" "}!
        <img
          src={assets.hand_wave}
          className="w-8 rounded-full aspect-square"
        ></img>
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>
      <p className=" text-gray-600 mb-8 max-w-md">
        Let's start with a quick product tour and we will have you up and
        running in no time !
      </p>

      <button className="border border-gray-500 rounded-full py-2.5 px-8 cursor-pointer hover:bg-gray-200 duration-300 transition-all">
        Get Started
      </button>
    </div>
  );
}

export default Header
