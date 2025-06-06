import React, { useState, useEffect, useRef } from "react";
import "../components/css/Hotels.css";
import { motion } from "framer-motion";

const RADIUS = 6371;
const toRad = d => d * Math.PI / 180;
const getDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [userLoc, setUserLoc] = useState(null);
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    fetch("/data/hotels.json")
      .then(r => r.json())
      .then(data => setHotels(data.filter(h => h.imageURL)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const n = filtered.length;
    clearInterval(timer.current);
    if (n > 0) {
      timer.current = setInterval(() => setCurrent(i => (i + 1) % n), 5000);
    }
    return () => clearInterval(timer.current);
  });

  const pause = () => clearInterval(timer.current);
  const resume = () => {
    const n = filtered.length;
    clearInterval(timer.current);
    if (n > 0) {
      timer.current = setInterval(() => setCurrent(i => (i + 1) % n), 5000);
    }
  };

  const locate = () => {
    navigator.geolocation.getCurrentPosition(
      pos => setUserLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => {}
    );
  };

  const filtered = hotels
    .filter(h =>
      h.hotelName.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase())
    )
    .filter(h => h.rating >= minRating)
    .map(h => (userLoc
      ? { ...h, dist: getDistance(userLoc.lat, userLoc.lon, h.latitude, h.longitude) }
      : h
    ));

  const n = filtered.length;
  const prev = (current - 1 + n) % n;
  const next = (current + 1) % n;

  return (
    <div className="hotels-page">
      <div className="controls">
        <input
          type="text"
          placeholder="Search hotels or city…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={minRating} onChange={e => setMinRating(+e.target.value)}>
          <option value={0}>All ratings</option>
          <option value={3}>3★+</option>
          <option value={4}>4★+</option>
          <option value={5}>5★</option>
        </select>
        <button onClick={locate}>Use My Location</button>
      </div>

      {n === 0 ? (
        <p className="no-results">No hotels match your criteria.</p>
      ) : (
        <div className="carousel" onMouseEnter={pause} onMouseLeave={resume}>
          <button className="nav prev" onClick={() => setCurrent(prev)}>‹</button>

          <motion.div
            className="card small"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.4 }}
          >
            <img src={filtered[prev].imageURL} alt="" />
            <h3>{filtered[prev].hotelName}</h3>
            {userLoc && <p>{filtered[prev].dist.toFixed(1)} km</p>}
          </motion.div>

          <motion.div
            className="card large"
            key={current}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={filtered[current].imageURL} alt="" />
            <h2>{filtered[current].hotelName}</h2>
            <p>⭐ {filtered[current].rating}</p>
            {userLoc && <p>📍 {filtered[current].dist.toFixed(1)} km away</p>}
            <p>💰 From ₹{filtered[current].pricePerNight}</p>
          </motion.div>

          <motion.div
            className="card small"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.4 }}
          >
            <img src={filtered[next].imageURL} alt="" />
            <h3>{filtered[next].hotelName}</h3>
            {userLoc && <p>{filtered[next].dist.toFixed(1)} km</p>}
          </motion.div>

          <button className="nav next" onClick={() => setCurrent(next)}>›</button>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
