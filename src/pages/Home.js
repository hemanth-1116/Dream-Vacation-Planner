import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../pages/css/Home.css'
import backgroundVideo from '../assets/video.mp4'
import { MapPin, Search } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Typical from 'react-typical'

function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [darkMode, setDarkMode] = useState(false)

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <div className={`home-container ${darkMode ? 'dark' : ''}`}>
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="overlay"></div>
      <Navbar />

      <div className="hero-content">
        <h1 className="main-title">
          <Typical
            steps={["Dream Vacation Planner", 2000, "Plan. Travel. Explore.", 2000]}
            loop={Infinity}
            wrapper="span"
          />
        </h1>
        <p className="hero-subtitle">Find your next dream destination</p>

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


        <div className="scroll-arrow bounce">⬇️</div>
      </div>

      <svg viewBox="0 0 1440 320" className="wave-separator">
        <path fill="#fff" fillOpacity="1" d="M0,64L48,90.7C96,117,..."></path>
      </svg>

      <div className="discover-section" data-aos="fade-up">
        <h2>Discover New Horizons</h2>
        <p>Unveil hidden gems, unique cultures, and breathtaking landscapes around the world.</p>
      </div>

      <div className="gap-content">
        <div className="feature-box" data-aos="fade-right" data-aos-delay="100">
          <h2>Top Rated Destinations</h2>
          <p>Explore the best places loved by travelers all over India.</p>
        </div>
        <div className="feature-box" data-aos="zoom-in" data-aos-delay="200">
          <h2>Local Food Hotspots</h2>
          <p>Get ready to taste the most iconic dishes from every city!</p>
        </div>
        <div className="feature-box" data-aos="fade-left" data-aos-delay="300">
          <h2>Budget-Friendly Picks</h2>
          <p>Plan a trip that suits your pocket without compromising the fun.</p>
        </div>
      </div>

      <div className="cards-section">
        <div className="home-card ripple-effect" onClick={() => navigate('/places')} data-aos="flip-left" data-aos-delay="100">
          <img src="/images/places.jpg" alt="Places" />
          <h2>Places</h2>
        </div>
        <div className="home-card ripple-effect" onClick={() => navigate('/hotels')} data-aos="flip-up" data-aos-delay="200">
          <img src="/images/hotels.jpg" alt="Hotels" />
          <h2>Hotels</h2>
        </div>
        <div className="home-card ripple-effect" onClick={() => navigate('/restaurants')} data-aos="flip-right" data-aos-delay="300">
          <img src="/images/restaurants.jpg" alt="Restaurants" />
          <h2>Restaurants</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
