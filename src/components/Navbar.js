import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-title">
        WFHT
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link" end>
          Home
        </NavLink>
        <NavLink to="/dashboard" className="navbar-link">
          Dashboard
        </NavLink>
        <NavLink to="/profile" className="navbar-link">
          Profile
        </NavLink>
        <NavLink to="/taskLogger" className="navbar-link">
          Task Logger
        </NavLink>
        <NavLink to="/SummaryForm" className="navbar-link">
          Summary
        </NavLink>
        <button onClick={handleLogout} className="navbar-logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
