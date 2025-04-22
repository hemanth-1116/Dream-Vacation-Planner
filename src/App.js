import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Places from './pages/Places';
import PlaceInfo from './pages/PlaceInfo';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:id" element={<PlaceInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
