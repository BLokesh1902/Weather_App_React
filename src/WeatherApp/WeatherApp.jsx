import "./WeatherApp.css";

import clear_icon from "../assets/clear.png";
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import { useState } from "react";

// we use openweathermap api to get the data from the api 

const WeatherApp =  () => {

    let api_key = "8df125744d54fccd8bfacd61d70a247f";

    const search = async() => {
        const element = document.getElementsByClassName("city-input");
        // to check if the input is empty or not 
        if(element[0].value==""){
            return 0;
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
        let responce= await fetch(url)
        let data=await responce.json()

        const humidity = document.getElementsByClassName("humidity-percentage")
        const wind = document.getElementsByClassName("wind-rate");

        const temperature = document.getElementsByClassName("weather-temperature");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML=data.main.humidity+" %"
        wind[0].innerHTML=Math.floor(data.wind.speed)+" km/hr"
        temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
        location[0].innerHTML=data.name


        // weather icon change
        const[wicon,setWicon]=useState(cloud_icon)

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear_icon)
        }

        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
          setWicon(cloud_icon);
        }

        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
          setWicon(drizzle_icon);
        }

        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
           setWicon(drizzle_icon);
         }
        
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
           setWicon(rain_icon);
         }

        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
           setWicon(rain_icon);
        }
        
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
           setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon)
        }
    }


  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="city-input" placeholder="Search"  />

        <div className="search_icon" onClick={()=>{search()}}>
          <img src={search_icon} alt="search" />
        </div>
      </div>

     {/* center cloud image  */}

      <div className="weather-image">
        <img src={clear_icon} />
      </div>
     
      {/* Center Temperature  */}
      <div className="weather-temperature">24 </div>

      <div className="weather-location">India</div>

      <div className="data-container">

        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percentage">64 </div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" />
          <div className="data">
            <div className="wind-rate">80</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default WeatherApp