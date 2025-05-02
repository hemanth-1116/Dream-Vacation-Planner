import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Places from './pages/Places';
import PlaceInfo from './pages/PlaceInfo';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ Register route added */}
        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
