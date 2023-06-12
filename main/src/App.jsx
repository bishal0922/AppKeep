import Navbar from "./pages/Navbar";
import AppKeep from "./pages/AppKeep";
import Login from "./pages/Login";
import './App.css'
import { Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppKeep />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<h1>Not Found....</h1>} />
      </Routes>
    </div>
  );
}

export default App;
