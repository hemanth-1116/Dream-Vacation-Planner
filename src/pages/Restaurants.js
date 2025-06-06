import React, { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import '../components/css/RestaurantGlass.css';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/restaurants.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch restaurant data, bro! Maybe the chef unplugged the server 🔌🍳');
        setLoading(false);
      });
  }, []);

  return (
    <div className="restaurant-container">
      {error ? (
        <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>
      ) : loading ? (
        <p style={{ color: 'white', fontSize: '1.2rem' }}>Loading restaurants... 🍽️⏳</p>
      ) : restaurants.length === 0 ? (
        <p style={{ color: 'white', fontSize: '1.2rem' }}>No restaurants found, bro... Are we in a ghost town? 👻🍽️</p>
      ) : (
        restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <img
              src={restaurant.featured_image}
              alt={restaurant['Restaurant Name']}
              className="restaurant-image"
            />
            <h2 className="restaurant-name">{restaurant['Restaurant Name']}</h2>
            <p className="restaurant-location">
              <MapPin size={16} /> {restaurant.Address}
            </p>
            <p className="restaurant-cuisines">
              <i>{restaurant.Cuisines}</i>
            </p>
            <div className="restaurant-rating">
              <Star size={16} fill="white" /> {restaurant['Aggregate rating']} ({restaurant.Votes} votes)
            </div>
            <div className="restaurant-cost">
              Cost for two: {restaurant.Currency}{restaurant['Average Cost for two']}
            </div>
            <div style={{ marginTop: '1rem' }}>
              {restaurant['Has Table booking'] && (
                <button className="glass-btn glass-book">Book a Table</button>
              )}
              {!restaurant['Has Online delivery'] && (
                <button className="glass-btn glass-nodelivery">No Delivery</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
