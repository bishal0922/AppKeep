import { React, useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "../styles/userauth.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loginError, setLoginError] = useState(null)
    
useEffect(() => {
  try {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    // Clean up the listener when the component unmounts

  } catch (error) {
    console.error("Error in useEffect:", error);
  }
}, []);



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitButton = (e) => {
    //
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      //function returns a promise and gets user credentials
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/")
      })
      .catch((error) => {
        console.log("User Login failed");
        console.log(error);
        setLoginError("Failed to login. Please check your email and password")
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
      })
      .catch((error) => {
        console.log("Sign Out failed");
        console.log(error);
      });
  };


  return (
    <div>
    {authUser ? (
    <div>
          <div className="form-body">
            <div className="login-container">
              <p className="auth-type-display">
                You're already logged in as {authUser.email}
              </p>
              <button className="sign-out-button" onClick={handleSignOut}>SignOut</button>
              <div className="go-back-link">
              <Link to="/">Go back to home</Link>
              </div>
            </div>
          </div>
        </div> 
    ) : (
      <form onSubmit={handleSubmitButton} className="form-body">
        <div className="login-container">
          <h1 className="auth-type-display">Login</h1>

          <div className="type-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="type-field" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                cursor: "pointer",
              }}
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <p className="forgot-password-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
            
          <div className="error-message">
            {loginError}
          </div>

          <div className="submit-button">
            <button type="submit">Login</button>
          </div>

        </div>
      </form>

    )}
    </div>
  );
};

export default Login;
