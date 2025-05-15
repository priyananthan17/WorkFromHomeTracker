import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import initialUserData from "../data/userData";
import "./Navbar.css";

const UserNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const matchedUser = initialUserData.find((user) => user.name === username) || {
    id: null,
    name: "Guest",
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <NavLink to="/home" className="navbar-title">
        WFHT ({matchedUser.name})
      </NavLink>
      <button
        className="navbar-menu-toggle"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <NavLink to="/home" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to={`/user-dashboard/${matchedUser.id}`}
          className="navbar-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink to="/task-logger" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
          Task Logger
        </NavLink>
        <NavLink to="/summary-form" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
          Summary
        </NavLink>
        <NavLink to="/user-profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
          Profile
        </NavLink>
        <button onClick={handleLogout} className="navbar-logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;