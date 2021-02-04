import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Styles/App.css';

const App = () => {

  const [weather, setWeather] = useState(null)

  const [place, setPlace] = useState("");

  useEffect(() => {
    axios
      .get("https://api.weatherapi.com/v1/current.json?key=698767340bb948048da144645211101&q=London")
      .then((data) => {
        setWeather(data.data)
        console.log(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const getLocation = (e) => {
    setPlace(e.target.value)
  }

  const searchPlace = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=698767340bb948048da144645211101&q=${place}`)
      .then((data) => {
        setWeather(data.data)
      })
  }

  return (
    <div className="App">
      
      <div className="container">
        <div className="container-1">
          <input className="search" onChange={getLocation} type="search" placeholder="Search your City" />
          <div className="submitBtn">
            <button onClick={searchPlace} >Submit</button>
          </div>
          <div className="text-part">
            {weather && (
              <div>
                <h3>{weather.location.name}</h3>
                <h2>{weather.location.country}</h2>
                <h3>{weather.current.temp_c}°Celius</h3>
                <div className="image-icon">
                  <img src={weather.current.condition.icon} alt="" />
                </div>
                <h3>{weather.current.condition.text}</h3>
                <h3>Cloud: {weather.current.cloud}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;

