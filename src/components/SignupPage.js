import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userData from "../data/userData";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    phone: "",
    location: "",
  });
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => !phone || /^\+?[\d\s-]{10,}$/.test(phone);
  const validatePassword = (password) => password.length >= 8;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSignup = () => {
    const { name, email, password, phone } = formData;

    // Validation
    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number (at least 10 digits) or leave it empty.");
      return;
    }

    // Fetch users
    const savedUsers = JSON.parse(localStorage.getItem("allUsers")) || userData;

    // Check for unique name (used as username) and email
    const hasDuplicateName = savedUsers.some((user) => {
      const username = user.username || user.name || ""; // Fallback to name or empty string
      if (!user.username) {
        console.warn(`User with ID ${user.id} has no username. Using name: ${user.name}`);
      }
      return username.toLowerCase() === name.toLowerCase();
    });
    if (hasDuplicateName) {
      setError("Name is already taken.");
      return;
    }
    if (savedUsers.some((user) => user.email?.toLowerCase() === email.toLowerCase())) {
      setError("Email already exists.");
      return;
    }

    // Create new admin user
    const newUser = {
      id: Math.max(...savedUsers.map((u) => u.id), 0) + 1,
      username: name, // Use name as username
      password, // Insecure; hash in production
      name,
      email,
      phone: phone || "",
      department: formData.department || "",
      location: formData.location || "",
      status: "active",
      role: "admin",
      tasks: [],
      projects: [],
      profilePicture: "https://via.placeholder.com/100",
      date: new Date().toISOString().split("T")[0], // 2025-05-15
      github: "",
    };

    // Save to localStorage
    const updatedUsers = [...savedUsers, newUser];
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

    // Redirect to login
    alert(`Admin account created for ${name}. Please log in.`);
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h2>Create Admin Account</h2>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Full Name (used as username)"
            value={formData.name}
            onChange={handleInputChange}
            className="input-control"
            aria-label="Full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-control"
            aria-label="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            value={formData.password}
            onChange={handleInputChange}
            className="input-control"
            aria-label="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department (optional)</label>
          <input
            id="department"
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleInputChange}
            className="input-control"
            aria-label="Department"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input-control"
            aria-label="Phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location (optional)</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="input-control"
            aria-label="Location"
          />
        </div>
        <div className="form-actions">
          <button
            onClick={handleSignup}
            className="signup-button"
            aria-label="Create admin account"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/")}
            className="back-button"
            aria-label="Back to home"
          >
            Back to Home
          </button>
        </div>
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;