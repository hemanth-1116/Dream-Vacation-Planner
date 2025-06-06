import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        // Make sure places.json is in 'public/data/places.json'
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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
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

  const handleCardClick = (place) => {
    navigate(`/place/${encodeURIComponent(place.placeName)}`, {
      state: {
        placeData: place,
      },
    });
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
        <div className="places-container">
          <h1>Explore Beautiful Places</h1>

          <div className="controls">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search city or place"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleUseLocation}>Use Current Location</button>
          </div>

          <div className="places-grid">
            {paginatedPlaces.map((place) => (
              <div
                className="place-card"
                key={place.placeName}
                onClick={() => handleCardClick(place)}
              >
                <img src={place.imageURL} alt={place.placeName} />
                <h3>{place.placeName}</h3>
                <p>{place.city}</p>
                {userLatitude !== null && userLongitude !== null && (
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
            <span>
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
    </div>
  );
};

export default Places;
