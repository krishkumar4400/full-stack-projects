import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import {useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import axios from 'axios';
import { toast } from "react-toastify";

import {useClerk, UserButton} from '@clerk/clerk-react';

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const {openSignIn} = useClerk();

  const { backendUrl, setIsLogedIn, getUserData } = useContext(AppContent);

  const onSubmitHandler = async(e) => {
    try {
      // prevent the webpage from reload
      e.preventDefault();

      // it will send the cookies also with this request
      axios.defaults.withCredentials = true;
      if(state === "Sign Up") {
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password});
        if(data.success) {
          setIsLogedIn(true);
          getUserData();
          navigate('/');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const {data} = await axios.post(backendUrl + "/api/auth/login", {email,password});
        if(data.success) {
          setIsLogedIn(true);
          getUserData()
          navigate('/');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute top-5 left-5 w-28 sm:w-32 sm:left-20 cursor-pointer"
        alt=""
      />

      <div className="text-center text-sm bg-slate-900 w-full sm:w-96 p-10 justify-center rounded-lg text-indigo-300 shadow-lg">
        <h2 className="text-3xl text-white mb-3 font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="mb-7 text-sm">
          {state === "Sign Up"
            ? "Create your account !"
            : "Login to your account !"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center w-full gap-3 px-5 py-3 rounded-full bg-[#333A5C] mb-4">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="outline-0 bg-transparent"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="flex items-center w-full gap-3 px-5 py-3 rounded-full bg-[#333A5C] mb-4">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-0 bg-transparent"
              type="email"
              placeholder="Email Id"
              required
            />
          </div>
          <div className="flex items-center w-full gap-3 px-5 py-3 rounded-full bg-[#333A5C] mb-4">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-0 bg-transparent"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-400 cursor-pointer hover:text-indigo-300"
          >
            Forgot Password ?{" "}
          </p>
          <button className="bg-gradient-to-r from-indigo-500 to-indigo-900 w-full rounded-full py-2.5 text-white font-medium mb-4">
            {state}
          </button>
          <p className="text-gray-400 text-xs">
            {state === "Sign Up"
              ? "Already have an account ?"
              : "Don't have an account"}{" "}
            <span
              onClick={() =>
                setState(state === "Sign Up" ? "Login" : "Sign Up")
              }
              className="text-blue-400 text-sm underline cursor-pointer"
            >
              {" "}
              {state === "Sign Up" ? "Login here" : "Sign Up"}{" "}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
