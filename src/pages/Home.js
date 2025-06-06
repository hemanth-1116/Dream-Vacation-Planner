import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../pages/css/Home.css'
import backgroundVideo from '../assets/video.mp4'
import { MapPin, Search } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/places?search=${encodeURIComponent(query)}`)
    }
  }

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      navigate(`/places?lat=${latitude}&lng=${longitude}`)
    })
  }

  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="overlay"></div>
      <Navbar />

      <div className="hero-content">
        <h1>Dream Vacation Planner</h1>
        <p>Find your next dream destination</p>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search your dream place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}><Search size={18} /></button>
          <button onClick={handleLocation}><MapPin size={18} /></button>
        </div>
      </div>

      <div className="gap-content">
        <div className="feature-box" data-aos="fade-up">
          <h2>Top Rated Destinations</h2>
          <p>Explore the best places loved by travelers all over India.</p>
        </div>
        <div className="feature-box" data-aos="fade-up">
          <h2>Local Food Hotspots</h2>
          <p>Get ready to taste the most iconic dishes from every city!</p>
        </div>
        <div className="feature-box" data-aos="fade-up">
          <h2>Budget-Friendly Picks</h2>
          <p>Plan a trip that suits your pocket without compromising the fun.</p>
        </div>
      </div>

      <div className="cards-section">
        <div className="home-card" onClick={() => navigate('/places')} data-aos="fade-up">
          <img src="/images/places.jpg" alt="Places" />
          <h2>Places</h2>
        </div>
        <div className="home-card" onClick={() => navigate('/hotels')} data-aos="fade-up">
          <img src="/images/hotels.jpg" alt="Hotels" />
          <h2>Hotels</h2>
        </div>
        <div className="home-card" onClick={() => navigate('/restaurants')} data-aos="fade-up">
          <img src="/images/restaurants.jpg" alt="Restaurants" />
          <h2>Restaurants</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
