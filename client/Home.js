import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [showAbout, setShowAbout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [weather, setWeather] = useState(null);

  const API_KEY = "916f3f6c7d015ada059bf1aab6004c36";
  const CITY = "Navi Mumbai";

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
      )
      .then((res) => setWeather(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="logo">AgroAssist</div>

        <div className="nav-links">
          <a href="#home">Home</a>

          {/* ABOUT */}
          <div className="nav-item">
            <span
              onClick={() => {
                setShowAbout(!showAbout);
                setShowProfile(false);
              }}
            >
              About Us
            </span>

            {showAbout && (
              <div className="about-dropdown">
                <p>
                  AgroAssist is an AI-powered smart farming platform that helps
                  farmers detect crop diseases, access real-time weather data,
                  and improve agricultural productivity using modern technology.
                </p>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="nav-item">
            <div
              className="profile-circle"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowAbout(false);
              }}
            >
              P
            </div>

            {showProfile && <ProfileCard />}
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Building a Smarter Future for Farming</h1>
          <p>
            AI-powered disease detection, smart remedies, real-time weather
            insights and intelligent farming assistance.
          </p>
          <button className="primary-btn">Explore Features</button>
        </div>

        {/* WEATHER CARD */}
        {weather && (
          <div className="weather-card">
            <h3>🌤 Weather Forecast</h3>
            <p><strong>Location:</strong> {weather.name}</p>
            <p>🌡 Temperature: {weather.main.temp} °C</p>
            <p>☁ Condition: {weather.weather[0].main}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </section>

      {/* ================= DISEASE SECTION ================= */}
      <section className="disease-section">
        <h2>Plant Disease Prediction</h2>
        <p className="section-subtitle">
          Upload plant leaf images and get instant AI diagnosis & remedies
        </p>

        <div className="plant-cards">
          <div className="plant-card">
            <h3>Potato</h3>
            <p>Early & Late Blight Detection</p>
            <button onClick={() => navigate("/potato")}>
              Predict Disease
            </button>
          </div>

          <div className="plant-card">
            <h3>Bell Pepper</h3>
            <p>Bacterial Spot & Leaf Curl</p>
            <button>Predict Disease</button>
          </div>

          <div className="plant-card">
            <h3>Tomato</h3>
            <p>Leaf Mold & Mosaic Virus</p>
            <button>Predict Disease</button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="footer">
        <div className="footer-content">
          <h3>AgroAssist</h3>
          <p>
            AgroAssist is an AI-based smart farming platform providing disease
            detection, remedies, chatbot support, and weather forecasting.
          </p>

          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>

          <p className="copyright">
            © 2026 FarmDev. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* ================= CHATBOT ================= */}
      <df-messenger
        intent="WELCOME"
        chat-title="KisanSathi"
        agent-id="547227c5-e5eb-4a32-9da7-447f9bc2f2ab"
        language-code="en"
      ></df-messenger>
    </>
  );
}

export default Home;
