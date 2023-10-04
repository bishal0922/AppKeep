import Navbar from "./pages/Navbar";
import AppKeep from "./pages/AppKeep";
import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Auth from "./pages/auth/Auth";
import './App.css'
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppKeep />} />
        <Route path="/Login" element={<><Login /><Auth/></>} />
        <Route path="/Register" element={<><SignUp/><Auth/></>} />
        <Route path="/forgot-password" element={<><ForgotPassword/><Auth/></>} />
        <Route path="*" element={<h1>Not Found....</h1>} />
      </Routes>
    </div>
  );
}

export default App;
