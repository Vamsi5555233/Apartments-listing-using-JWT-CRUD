// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">🏛️ Built by Vamsi</h1>
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        {token ? (
          <button onClick={handleLogoutClick}>🚪 Logout</button>
        ) : (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/register">🆕 Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
