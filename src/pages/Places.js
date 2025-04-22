import React, { useState, useEffect } from 'react';
import PlaceCard from '../components/PlaceCard';
import Pagination from '../components/Pagination';

function Places() {
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 8;

  useEffect(() => {
    fetch('/data/places.json')
      .then(res => res.json())
      .then(data => setPlaces(data));
  }, []);

  const indexOfLast = currentPage * placesPerPage;
  const indexOfFirst = indexOfLast - placesPerPage;
  const currentPlaces = places.slice(indexOfFirst, indexOfLast);

  return (
    <div className="places-page">
      <h2>Famous Places in India</h2>
      <div className="places-grid">
        {currentPlaces.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      <Pagination 
        total={places.length} 
        perPage={placesPerPage} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

export default Places;
