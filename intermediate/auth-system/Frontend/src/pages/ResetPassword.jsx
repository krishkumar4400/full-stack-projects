import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const inputRefs = React.useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(''));
      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {otp,email,newPassword});
      if(data.success) {
        toast.success(data.message);
        navigate('/login');
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="w-28 sm:w-32 absolute top-5 left-5 sm:left-20 cursor-pointer"
        onClick={() => navigate("/")}
      />
      {/* Enter Email Id */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 w-full sm:w-96 rounded-lg p-8 text-sm"
        >
          <h1 className="text-center text-white font-semibold text-2xl sm:text-3xl mb-2 ">
            Reset Password
          </h1>
          <p className="text-center text-indigo-300 mb-7 ">
            Enter your registered email address
          </p>
          <div className="bg-[#333A5C] w-full py-2.5 px-5 rounded-full flex items-center gap-3">
            <img src={assets.mail_icon} alt="" className="w-3 h-3" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              className="bg-transparent text-white font-medium outline-0"
              required
            />
          </div>
          <button className="text-center mt-3 w-full bg-gradient-to-r text-white font-medium from-indigo-500 to-indigo-900 rounded-full py-2.5">
            Send OTP
          </button>
        </form>
      )}

      {/* otp input form */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 p-8 w-full sm:w-96 rounded-lg shadow-lg text-sm"
        >
          <h1 className="text-white text-center text-2xl sm:text-3xl font-semibold mb-4">
            Reset password OTP
          </h1>
          <p className="text-indigo-300 text-center pb-6 px-10">
            Enter the 6-digit code sent to your Email id
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  ref={(e) => (inputRefs.current[index] = e)}
                  type="text"
                  required
                  maxLength={1}
                  key={index}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                />
              ))}
          </div>
          <button className="text-center w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium py-2.5 rounded-full ">
            Submit
          </button>
        </form>
      )}
      {/* new password input form */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 w-full sm:w-96 rounded-lg p-8 text-sm"
        >
          <h1 className="text-center text-white font-semibold text-2xl sm:text-3xl mb-2 ">
            New Password
          </h1>
          <p className="text-center text-indigo-300 mb-7 ">
            Enter the new password below
          </p>
          <div className="bg-[#333A5C] w-full py-2.5 px-5 rounded-full flex items-center gap-3">
            <img src={assets.lock_icon} alt="" className="w-3 h-3" />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              placeholder="password"
              className="bg-transparent text-white font-medium outline-0"
              required
            />
          </div>
          <button className="text-center mt-3 w-full bg-gradient-to-r text-white font-medium from-indigo-500 to-indigo-900 rounded-full py-2.5">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
