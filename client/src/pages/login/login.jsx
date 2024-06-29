import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import checkValidateData from "../../utils/validate";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const message = checkValidateData(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrorMessage(message);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <h1 className="form-title">{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && (
          <input type="text" placeholder="Full Name" className="input-field" />
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
