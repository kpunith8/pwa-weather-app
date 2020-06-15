import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [query, setQuery] = useState("Bengaluru");
  const [weather, setWeather] = useState({});
  const [onLoaded, setOnLoaded] = useState(false);

  const search = useCallback(
    async (e) => {
      if (e?.key === "Enter" || onLoaded) {
        console.log("onLoaded", onLoaded);
        const weatherData = await fetchWeather(query);

        setWeather(weatherData);
        setQuery("");
      }
    },
    [query, onLoaded]
  );

  // For loading the data on initial page load,
  // can be improved adding the button to search
  // instead on onKeyPress on input
  useEffect(() => {
    setOnLoaded(true);
    search();
  }, [search]);

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
