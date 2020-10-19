import React, { useState } from "react";

const api = {
  key: "5a4e70fbc8f35a0651b49d0a6c4656d8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [enter, setEnter] = useState(false);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [available, setAvailable] = useState(false);

  const search = (evt) => {
    setEnter(true);
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setAvailable(true);
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 16
            ? "App cold"
            : "App"
          : "App"
      }
    >
      {enter ? (
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : available ? (
            <div className="location-box">
              <div className="location">Sorry, no results found.</div>
            </div>
          ) : (
            <div className="location-box">
              <div className="location">Searching...</div>
            </div>
          )}
        </main>
      ) : (
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          <div className="weather-box">
            <div className="weather">Welcome to Get-Weather</div>
          </div>
          <br />
          <div className="location-box">
            <div className="location">Search and get started.</div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
