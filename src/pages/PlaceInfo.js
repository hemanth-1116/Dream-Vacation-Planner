import React from 'react';
import { useParams } from 'react-router-dom';
import './css/PlaceInfo.css';

function PlaceInfo() {
  const { id } = useParams();
  return (
    <div className="place-info-page">
      <h1>Place Name</h1>
      <iframe 
        src={`https://www.google.com/maps?q=Hyderabad&output=embed`} 
        title="Map" 
        className="map-iframe"
      ></iframe>
      <p>Description about the place...</p>
      <div className="info-buttons">
        <button>View Nearby Restaurants</button>
        <button>View Nearby Hotels</button>
      </div>
    </div>
  );
}

export default PlaceInfo;
