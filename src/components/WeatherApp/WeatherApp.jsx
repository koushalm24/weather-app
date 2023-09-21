import React, { useState } from 'react'
import './WeatherApp.css'

import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import search_icon from '../Assets/search.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import error_icon from '../Assets/404.png'

function WeatherApp() {
  let api_key = "ced627980493a6e1ccaf75c7a513610d";

  const [wicon, setWicon] = useState(clear_icon);
  const [visible, setVisible] = useState(false);

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      search();
    }
  };
  const search = async () => {
    const element = document.getElementsByClassName('cityInput');

    if (element[0].value === "") {
      alert("Please Enter A City To search");
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`


    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percentage");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const condition = document.getElementsByClassName("condition");

    if (data.cod === "404") {

      setVisible(false);
      location[0].innerHTML = "City Not Found !!";
      setWicon(error_icon);

    }
    else {
      setVisible(true);
      humidity[0].innerHTML = data.main.humidity + "%";
      wind[0].innerHTML = data.wind.speed + "km/h";
      temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
      location[0].innerHTML = data.name;
      condition[0].innerHTML = data.weather[0].main;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      }
      else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
      }
      else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(cloud_icon);
      }
      else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(cloud_icon);
      }
      else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(drizzle_icon);
      }
      else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain_icon);
      }
      else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow_icon);
      }
      else {
        setWicon(clear_icon);
      }
    }


  }

  return (
    <div className="container" >

      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" onKeyDown={handleKeyDown} />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <p className={`condition ${visible ? '' : 'hidden'}`}></p>
      <div className={`weather-temp ${visible ? '' : 'hidden'}`}>Temp in °C</div>
      <div className="weather-location">Enter A Location</div>
      <div className="data-container">

        <div className={`element ${visible ? '' : 'hidden'}`}>
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage"></div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className={`element ${visible ? '' : 'hidden'}`}>
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate"></div>
            <div className="text">Wind Speed</div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WeatherApp