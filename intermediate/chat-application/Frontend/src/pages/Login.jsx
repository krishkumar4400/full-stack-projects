import React from 'react'

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="max-w-sm  flex flex-col items-center text-white p-4 px-6 border border-white rounded-md ">
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-4xl pb-1">Login</h1>
          <p className="text-sm font-medium text-gray-400 pb-8">
            Login to your account
          </p>
        </div>
        <form className="w-full flex flex-col items-center">
          <input
            className=" border border-sky-400 rounded-full px-4 py-2 w-full outline-none my-2"
            type="email"
            placeholder="Your Email id"
          />
          <input
            className=" border border-sky-400 rounded-full px-4 py-2 w-full outline-none my-2"
            type="password"
            placeholder="Your Password"
          />
          <button className='font-medium border-0 rounded-full w-full bg-blue-600 py-2 my-2 active:bg-blue-500 active:scale-95 duration-150 text-base' type="submit">Login</button>
          <p className='cursor-pointer underline text-red-600'>Forgot password</p>
        </form>
      </div>
    </div>
  );
}

export default Login
