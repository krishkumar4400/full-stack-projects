import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'
  import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/email-verify' element={<EmailVerify/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
        <Route path='/change-password' element={<ChangePassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App
