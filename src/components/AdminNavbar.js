import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/admin/dashboard" className="navbar-title">
        WFHT (Admin)
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/admin/dashboard" className="navbar-link">
          Dashboard
        </NavLink>
         <NavLink to="/allusers" className="navbar-link">
          All Users
        </NavLink>
        <NavLink to="/assign-task" className="navbar-link">
          Assign Task
        </NavLink>
        <NavLink to="/profile" className="navbar-link">
          Profile
        </NavLink>
        <NavLink to="/SummaryForm" className="navbar-link">
          Summary
        </NavLink>
        <button onClick={handleLogout} className="navbar-logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
