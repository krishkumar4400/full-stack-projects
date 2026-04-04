import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLogedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
        console.log(userData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
      if(data.success) {
        setIsLogedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAuthState();
  }, [])
  

  const value = {
    backendUrl,
    isVerified,
    setIsVerified,
    userData,
    setUserData,
    isLoggedIn,
    setIsLogedIn,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
