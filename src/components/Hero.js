import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './css/Hero.css';
import videoBg from '../assets/video.mp4';

function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      alert(`Searching for ${searchQuery}`);
    } else {
      alert('Please enter a search term');
    }
  };

  return (
    <div className="hero-container" id="hero">
      <video className="hero-video" src={videoBg} autoPlay loop muted />
      <div className="video-overlay"></div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <h1>Plan Your Dream Vacation</h1>
        <p>Discover the best places, restaurants, and hotels near you!</p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city or region (e.g., Hyderabad)"
          />
          <button type="submit">Search</button>
        </form>
        <div className="hero-buttons">
          <button>Use Current Location</button>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
