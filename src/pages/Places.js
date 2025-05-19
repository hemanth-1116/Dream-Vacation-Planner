import React, { useState, useEffect } from "react";
import "../components/css/Places.css";
import bgImage from "../assets/places-bg.jpg";

const Places = () => {
  const [allPlacesData, setAllPlacesData] = useState([]);
  const [filteredPlacesData, setFilteredPlacesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const placesPerPage = 8;

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const response = await fetch("/data/places.json");
        const data = await response.json();
        setAllPlacesData(data);
        setFilteredPlacesData(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlacesData();
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);
    const filtered = allPlacesData.filter(
      (place) =>
        place.city.toLowerCase().includes(query) ||
        place.placeName.toLowerCase().includes(query)
    );
    setFilteredPlacesData(filtered);
    setCurrentPage(1);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setUserLatitude(lat);
          setUserLongitude(lon);
          const sorted = [...filteredPlacesData].sort((a, b) => {
            const distA = getDistance(lat, lon, a.latitude, a.longitude);
            const distB = getDistance(lat, lon, b.latitude, b.longitude);
            return distA - distB;
          });
          setFilteredPlacesData(sorted);
          setCurrentPage(1);
        },
        () => {
          alert("Location access denied. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation not supported in this browser.");
    }
  };

  const start = (currentPage - 1) * placesPerPage;
  const end = start + placesPerPage;
  const paginatedPlaces = filteredPlacesData.slice(start, end);
  const totalPages = Math.ceil(filteredPlacesData.length / placesPerPage);

  return (
    <div
      className="places-background"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="places-overlay">
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search city or place"
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleUseLocation}>Use Current Location</button>
        </div>

        <div className="places-grid">
          {paginatedPlaces.map((place, index) => (
            <div className="place-card" key={index}>
              <img src={place.imageURL} alt={place.placeName} />
              <h3>{place.placeName}</h3>
              <p>{place.city}</p>
              {userLatitude && userLongitude && (
                <p>
                  {getDistance(
                    userLatitude,
                    userLongitude,
                    place.latitude,
                    place.longitude
                  ).toFixed(2)}{" "}
                  km
                </p>
              )}
              <p>⭐ {place.rating}</p>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span style={{ margin: "0 15px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Places;
