import React from 'react'
import './css/Navbar.css'
import profilePic from '../assets/profile.jpg'
import { Link } from 'react-scroll'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Dream Vacation Planner</div>
      <div className="nav-links">
        <Link to="hero" smooth={true} duration={1500}>Home</Link>
        <a href="/login">Login</a>
        <a href="/places">Places</a>
        <a href="/restaurants">Restaurants</a>
        <a href="/hotels">Hotels</a>
      </div>
      <div className="profile">
        <img src={profilePic} alt="Profile" />
        <button>Login</button>
      </div>
    </nav>
  )
}

export default Navbar
