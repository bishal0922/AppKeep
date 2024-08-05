import "./styles/navbar.css";
import logo from "../assets/logo/android-chrome-512x512.png";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { React, useState, useEffect } from "react";
import { auth } from "../firebase";

const Navbar = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="AppKeep-title">
        <Link to="/">Appkeep</Link>
      </div>

      <ul>
        {authUser ? (
          <li>
            <Link className="links" to="/Login">
              SignOut
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link className="links" to="/Login">
                Login
              </Link>
            </li>

            <li>
              <Link className="links" to="/Register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
