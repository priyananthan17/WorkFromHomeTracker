import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminData from '../data/AdminData';
import './Navbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
   const username = localStorage.getItem("username") || "Guest";
  const matchedAdmin = AdminData.find((user) => user.name === username) || {
    id: null,
    name: "Guest",
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/admin/dashboard" className="navbar-title">
        WFHT ({matchedAdmin.name})
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/admin/dashboard" className="navbar-link">
          Dashboard
        </NavLink>
         <NavLink to="/all-users" className="navbar-link">
          All Users
        </NavLink>
        <NavLink to="/assign-task" className="navbar-link">
          Assign Task
        </NavLink>
        <NavLink to="/profile" className="navbar-link">
          Profile
        </NavLink>
        <button onClick={handleLogout} className="navbar-logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
