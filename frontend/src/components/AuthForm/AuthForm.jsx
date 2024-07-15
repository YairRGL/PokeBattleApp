import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "../../store/slices/authSlice";
import pokemonLogo from "../../assets/pokemon-logo.png";
import "./AuthForm.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For TESTING purposes only
    if (email === "user@example.com" && password === "123456") {
      dispatch(login({ email }));
    } else {
      dispatch({ type: "auth/loginFailed", payload: "Invalid credentials" });
    }
  };

  const handleInputChange = () => {
    if (loginError) {
      dispatch(clearError());
    }
  };

  const closeErrorMessage = () => {
    dispatch(clearError());
  };

  return (
    <div className="login-form">
      <h2>Welcome to</h2>
      <img src={pokemonLogo} alt="Pokemon Logo" className="pokemon-logo" />
      <form onSubmit={handleSubmit}>
        {loginError && (
          <div className="error-message">
            <span>{loginError}</span>
            <button
              type="button"
              className="close-button"
              onClick={closeErrorMessage}
            >
              &times;
            </button>
          </div>
        )}
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="me">
        <a href="https://github.com/YairRGL" target="_blank" rel="noopener noreferrer">
          by Yair R. © 2024
        </a>
      </div>
    </div>
  );
};

export default AuthForm;