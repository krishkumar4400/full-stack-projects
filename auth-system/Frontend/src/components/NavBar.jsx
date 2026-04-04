import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser, UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  const navigate = useNavigate();
  const {user} = useUser();

  const { setIsLogedIn, userData, backendUrl, setUserData } =
    useContext(AppContent);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLogedIn(false);
        setUserData(false);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOTP = async() => {
    
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      if(data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full flex justify-between p-4 sm:p-6 sm:px-20 absolute top-0">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="cursor-pointer w-28 sm:w-32"
        alt=""
      />

      {userData ? (
        <div className="bg-gray-900 rounded-full text-white flex items-center justify-center h-10 w-10 cursor-pointer relative group">
          {" "}
          {userData?.name?.[0]?.toUpperCase()}{" "}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none text-black m-0 p-2 bg-gray-200 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOTP}
                  className="py-1 px-2 cursor-pointer hover:bg-gray-300"
                >
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className="py-1 px-2 pr-19 cursor-pointer hover:bg-gray-300"
              >
                Logout
              </li>
              <li
                onClick={() => navigate("/change-password")}
                className="py-1 px-2 cursor-pointer hover:bg-gray-300"
              >
                Change password
              </li>
            </ul>
          </div>
        </div>
      ) : user ? (
        <UserButton />
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-200 transition-all duration-300"
        >
          Login <img src={assets.arrow_icon}></img>
        </button>
      )}
    </div>
  );
};

export default NavBar;
