import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import userData from "../data/userData";
import AdminData from "../data/AdminData";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const matchedAdmin = AdminData.find(
      (user) => user.name === username && user.password === password
    );
    if (matchedAdmin) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", matchedAdmin.name);
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
      return;
    }
    const matchedUser = userData.find(
      (user) => user.name === username && user.password === password
    );
    if (matchedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", matchedUser.name);
      localStorage.setItem("role", "user");
      navigate("/home");
    } else {

      const userExists = userData.find((user) => user.name === username);
      setError(
        userExists ? "Incorrect password." : "Username not found."
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} aria-labelledby="login-title">
        <h2 id="login-title">Login</h2>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
            aria-label="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
            aria-label="Password"
          />
        </div>
        <button type="submit" aria-label="Login">
          Login
        </button>
        <div className="login-links">
          <Link to="/signup" className="signup-link">
            Don't have an account? Sign up
          </Link>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;