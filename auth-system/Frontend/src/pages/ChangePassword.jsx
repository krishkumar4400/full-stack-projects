import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmNewPassword] = useState("");

  const { backendUrl } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if(newPassword != confirmPassword) {
        return toast.error("Entered new password doesn't match");
      } 
      if(newPassword.length < 6) {
        return toast.error("New password must contain atleast 6 characters");
      }
      const {data} = await axios.post(backendUrl + '/api/auth/change-password', {oldPassword,newPassword});
      if(data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
        navigate('/change-password');
      }


    } catch (error) {
      toast.error(error.message);
    }
  };

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
          Change Password
        </h2>
        <p className="mb-7 text-sm">change your password</p>
        <form onSubmit={onSubmitHandler}>
          <div className="flex items-center w-full gap-3 px-5 py-3 rounded-full bg-[#333A5C] mb-4">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              className="outline-0 bg-transparent"
              type="password"
              placeholder="Old Password"
              required
            />
          </div>

          <div className="flex items-center w-full gap-3 px-5 py-3 rounded-full bg-[#333A5C] mb-4">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="outline-0 bg-transparent"
              type="password"
              placeholder="New Password"
              required
            />
          </div>
          <div className="flex items-center w-full gap-3 px-5 py-3 rounded-full bg-[#333A5C] mb-4">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmPassword}
              className="outline-0 bg-transparent"
              type="password"
              placeholder="Confirm New Password"
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
