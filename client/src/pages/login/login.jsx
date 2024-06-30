import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import checkValidateData from "../../utils/validate";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);
  const navigate = useNavigate();

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(null);
  };

  const handleButtonClick = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const fullName = isSignIn ? null : fullNameRef.current.value;
    const message = checkValidateData(
      email,
      password,
      isSignIn ? null : fullName
    );
    if (message) {
      setErrorMessage(message);
      return;
    }

    try {
      const response = await axios.post(
        isSignIn ? "/api/v1/user/login" : "/api/v1/user/signup",
        isSignIn ? { email, password } : { email, password, fullName },
        { withCredentials: true } // Enable cookies
      );

      document.cookie = `accessToken=${response.data.data.accessToken}; path=/`;
      document.cookie = `refreshToken=${response.data.data.refreshToken}; path=/`;
      setIsLoggedIn(true);
      navigate("/"); // Redirect to home page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <h1 className="form-title">{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && (
          <input
            ref={fullNameRef}
            type="text"
            placeholder="Full Name"
            className="input-field"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="input-field"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="input-field"
        />
        <p className="error-message">{errorMessage}</p>
        <button className="submit-button" onClick={handleButtonClick}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <div className="switch-link">
          <p className="switch-text">
            {isSignIn ? "New to Cloud Vault?" : "Already a User?"}
          </p>
          <Link className="switch-link-text" to={"/#"} onClick={toggleSignIn}>
            {isSignIn ? "Sign up now" : "Sign in"}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
