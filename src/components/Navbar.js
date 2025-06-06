import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import profileIcon from '../assets/profile.jpg';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
         
        </div>

        <div className="navbar-center">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/places" className="nav-btn">Places</Link>
          <Link to="/hotels" className="nav-btn">Hotels</Link>
          <Link to="/restaurants" className="nav-btn">Restaurants</Link>
        </div>

        <div className="navbar-right" ref={dropdownRef}>
          <div className="profile-wrapper" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={profileIcon} alt="Profile" className="profile-icon" />
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <p className="dropdown-text">Welcome, User!</p>
                  <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button className="dropdown-btn" onClick={handleLogin}>Login</button>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="scroll-indicator">↓</div>
    </>
  );
};

export default Navbar;
