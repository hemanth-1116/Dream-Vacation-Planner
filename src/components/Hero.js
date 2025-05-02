import React from 'react';
import { motion } from 'framer-motion';
import './css/Hero.css';
import videoBg from '../assets/video.mp4';

function Hero() {
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
        <p>Discover breathtaking places, hotels, and food across India.</p>
      </motion.div>
    </div>
  );
}

export default Hero;
