import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Places from './pages/Places';
import PlaceInfo from './pages/PlaceInfo';
import PlaceDetails from './pages/PlaceDetails';
import HotelsPage from './pages/hotelsPage';
import Restaurants from './pages/Restaurants'; 

import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceInfo />} />
        <Route path="/place/:placeName" element={<PlaceDetails />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
