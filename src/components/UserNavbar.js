import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import initialUserData from "../data/userData";
import "./Navbar.css";

const UserNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";
  const users = initialUserData.find((user) => user.name === username);
  const matchedUser = users ? users : { id: null };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLink to="/home" className="navbar-title">
        WFHT ({matchedUser.name})
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/home" className="navbar-link">
          Home
        </NavLink>
        <NavLink to="/taskLogger" className="navbar-link">
          Task Logger
        </NavLink>
        <NavLink to="/SummaryForm" className="navbar-link">
          Summary
        </NavLink>
        <NavLink to="/user-profile" className="navbar-link">
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
