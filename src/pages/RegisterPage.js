import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/css/Register.css'; // Ensure this path matches your project structure
import video from '../assets/video.mp4'; // Correct video import

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('registeredUser', JSON.stringify(form));
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <video autoPlay loop muted className="register-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="register-form-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
