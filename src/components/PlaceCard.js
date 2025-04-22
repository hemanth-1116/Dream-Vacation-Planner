import React from 'react';
import { Link } from 'react-router-dom';
import './css/PlaceCard.css';

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <Link to={`/places/${place.id}`}>
        <img src={place.image} alt={place.name} />
        <div className="place-info">
          <h3>{place.name}</h3>
          <p><strong>City:</strong> {place.city}</p>
          <p><strong>Distance:</strong> {place.distance} km</p>
          <p><strong>Rating:</strong> ⭐ {place.rating}</p>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCard;
