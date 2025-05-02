import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Added Link
import "../pages/css/LoginPage.css";
import bgImage from '../assets/background2.webp'; // ✅ Confirm path

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (storedUser?.email === email && storedUser?.password === password) {
    alert("✅ Successfully Logged In!");
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  } else {
    setError("❌ Invalid email or password.");
  }
};


  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="login-box">
        <button className="close-button">&times;</button>
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-text">
          Don’t have an account?{" "}
          <Link to="/register" className="register-button">Register</Link> {/* ✅ Link added */}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
