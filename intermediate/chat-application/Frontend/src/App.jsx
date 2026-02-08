import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
const App = () => {
  return (
  <div className="bg-[url('./assets/bgImage.svg')] bg-contain">
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
    </Routes>
  </div>
  )
};

export default App;