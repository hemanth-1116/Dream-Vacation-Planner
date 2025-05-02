import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../pages/css/Home.css';
import backgroundVideo from '../assets/video.mp4';

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className="overlay"></div>

      {/* Navbar placed ABOVE */}
      <Navbar />

      {/* Hero Content */}
      <div className="hero-content">
        <h1>Dream Vacation Planner</h1>
        <p>Find your next dream destination</p>

        {/* ✅ Conditionally show Login button only if NOT logged in */}
        {!isLoggedIn && (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
