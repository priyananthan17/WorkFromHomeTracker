import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <NavLink 
        to="/" 
        style={{ 
          ...styles.title, 
          textDecoration: 'none', 
          color: 'white', 
          fontSize: '24px', 
          fontWeight: 'bold' 
        }}
      >
        WFHT
      </NavLink>
      <div style={styles.links}>
        <NavLink to="/" style={getLinkStyle} end>
          Home
        </NavLink>
        <NavLink to="/dashboard" style={getLinkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" style={getLinkStyle}>
          Profile
        </NavLink>
        <NavLink to="/taskLogger" style={getLinkStyle}>
          Task Logger
        </NavLink>
        <NavLink to="/SummaryForm" style={getLinkStyle}>
          Summary
        </NavLink>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#0077b6',
    color: '#fff',
  },
  title: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4c4c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

const getLinkStyle = ({ isActive }) => ({
  color: isActive ? '#ffd60a' : '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  borderBottom: isActive ? '2px solid #ffd60a' : 'none',
});

export default Navbar;
