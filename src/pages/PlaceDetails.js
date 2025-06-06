import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/css/PlaceDetails.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import L from "leaflet";

// ✅ Import custom red pin icon
import redPin from "../assets/red-pin.png"; // Make sure this path is correct

// ✅ Define custom Leaflet icon
const locationIcon = new L.Icon({
  iconUrl: redPin,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40]
});

const PlaceDetails = () => {
  const { state } = useLocation();
  const { placeData } = state || {};
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!placeData) {
      navigate("/places");
      return;
    }

    const fetchNearbyData = async () => {
      try {
        setLoading(true);
        setError(null);

        const hotelRes = await fetch("/data/hotels.json");
        if (!hotelRes.ok) throw new Error("Failed to fetch hotels data.");
        const hotelData = await hotelRes.json();

        const restaurantRes = await fetch("/data/restaurants.json");
        if (!restaurantRes.ok) throw new Error("Failed to fetch restaurants data.");
        const restaurantData = await restaurantRes.json();

        const nearbyHotels = hotelData
          .filter((hotel) => hotel.latitude && hotel.longitude)
          .map((hotel) => ({
            ...hotel,
            imageURL: hotel.imageURL || placeData.imageURL
          }))
          .filter(
            (hotel) =>
              getDistance(
                placeData.latitude,
                placeData.longitude,
                hotel.latitude,
                hotel.longitude
              ) <= 10
          );

        const normalizedRestaurants = restaurantData
          .filter((rest) => rest.Latitude && rest.Longitude)
          .map((rest) => ({
            restaurantName: rest["Restaurant Name"],
            cuisine: rest["Cuisines"],
            rating: rest["Aggregate rating"],
            latitude: rest["Latitude"],
            longitude: rest["Longitude"],
            imageURL: rest["featured_image"] || placeData.imageURL,
            dist: getDistance(
              placeData.latitude,
              placeData.longitude,
              rest["Latitude"],
              rest["Longitude"]
            )
          }));

        const nearbyRestaurants = normalizedRestaurants.filter((r) => r.dist <= 10);
        const finalRestaurants =
          nearbyRestaurants.length > 0
            ? nearbyRestaurants
            : normalizedRestaurants.sort((a, b) => a.dist - b.dist).slice(0, 5);

        setHotels(nearbyHotels);
        setRestaurants(finalRestaurants);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyData();
  }, [placeData, navigate]);

  if (!placeData) {
    return <div>Redirecting to places list...</div>;
  }

  if (loading) {
    return <div>Loading nearby hotels and restaurants...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <motion.div
      className="place-details-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <button className="back-button" onClick={() => navigate("/places")}>
        🔙 Back to Places
      </button>

      <div className="hero-section">
        <img src={placeData.imageURL} alt={placeData.placeName} />
        <div className="hero-text">
          <h1>{placeData.placeName}</h1>
          <p className="city">📍 {placeData.city}</p>
          <p className="rating">⭐ {placeData.rating}</p>
          <p className="description">{placeData.description}</p>
          <p className="best-time">🗓️ Best Time to Visit: {placeData.bestTimeToVisit}</p>
        </div>
      </div>

      <section className="hotels-section">
        <h2>🏨 Nearby Hotels</h2>
        <div className="cards-container">
          {hotels.length === 0 && <p>No nearby hotels found within 10 km.</p>}
          {hotels.map((hotel, index) => (
            <div className="card" key={index}>
              <img src={hotel.imageURL} alt={hotel.hotelName} />
              <h3>{hotel.hotelName}</h3>
              <p>⭐ Rating: {hotel.rating}</p>
              <p>
                📍 Distance:{" "}
                {getDistance(
                  placeData.latitude,
                  placeData.longitude,
                  hotel.latitude,
                  hotel.longitude
                ).toFixed(2)}{" "}
                km
              </p>
              <p>💰 From ₹{hotel.pricePerNight}/night</p>
            </div>
          ))}
        </div>
      </section>

      <section className="restaurants-section">
        <h2>🍽️ Restaurants Around</h2>
        <div className="cards-container">
          {restaurants.length === 0 ? (
            <p>No restaurants available.</p>
          ) : (
            restaurants.map((rest, index) => (
              <div className="card" key={index}>
                <img src={rest.imageURL} alt={rest.restaurantName} />
                <h3>{rest.restaurantName}</h3>
                <p>🍲 Cuisine: {rest.cuisine}</p>
                <p>⭐ Rating: {rest.rating}</p>
                <p>📍 Distance: {rest.dist.toFixed(2)} km</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="map-section">
        <h2>📍 Map View</h2>
        <MapContainer
          center={[placeData.latitude, placeData.longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[placeData.latitude, placeData.longitude]} icon={locationIcon}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <strong>{placeData.placeName}</strong>
              </div>
            </Popup>
          </Marker>

          {hotels.map(
            (hotel, i) =>
              hotel.latitude &&
              hotel.longitude && (
                <Marker
                  key={`h-${i}`}
                  position={[hotel.latitude, hotel.longitude]}
                  icon={locationIcon}
                >
                  <Popup>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={hotel.imageURL}
                        alt={hotel.hotelName}
                        style={{
                          width: "100px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px"
                        }}
                      />
                      <p style={{ margin: "0.3rem 0 0", fontWeight: "bold" }}>
                        {hotel.hotelName}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )
          )}

          {restaurants.map(
            (rest, i) =>
              rest.latitude &&
              rest.longitude && (
                <Marker
                  key={`r-${i}`}
                  position={[rest.latitude, rest.longitude]}
                  icon={locationIcon}
                >
                  <Popup>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={rest.imageURL}
                        alt={rest.restaurantName}
                        style={{
                          width: "100px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px"
                        }}
                      />
                      <p style={{ margin: "0.3rem 0 0", fontWeight: "bold" }}>
                        {rest.restaurantName}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </section>
    </motion.div>
  );
};

export default PlaceDetails;
