import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../readme_assets/search.png";
import clear_icon from "../readme_assets/clear.png";
import cloud_icon from "../readme_assets/cloud.png";
import drizzle_icon from "../readme_assets/drizzle.png";
import rain_icon from "../readme_assets/rain.png";
import snow_icon from "../readme_assets/snow.png";
import wind_icon from "../readme_assets/wind.png";
import humidity_icon from "../readme_assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("New York"); // Default location

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const fetchWeather = async (city) => {
    if (!city) {
      alert("Enter a city name");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "City not found. Please try again.");
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIcons[data.weather[0].icon] || clear_icon,
      });

      setLocation(city);
    } catch (error) {
      alert("Error fetching weather data.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchWeather("Dallas");
  }, []);

  return (
    <div className="weather">
      <h1 className="weather-title">Weather App</h1>
      <img src={weatherData ? weatherData.icon : search_icon} alt="Weather Icon" className="weather-icon" />
      <h2 className="weather-subtitle">Find Weather of a City</h2>

      {/* Search Bar Section */}
      <div className="search-container">
        <input ref={inputRef} type="text" placeholder="City" className="search-input" />
        <button
          type="button"
          className="search-button"
          onClick={() => fetchWeather(inputRef.current.value)}
        >
          Search
        </button>
      </div>

      {/* Weather Data Section */}
      {weatherData && (
        <>
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed Icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;

