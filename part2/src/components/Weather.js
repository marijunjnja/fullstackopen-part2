import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [ weather, setWeather ] = useState([])

  const accessKey = 'd18a807171ba086b5c89841321c2301d'
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}`

  const hook = () => {
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        setWeather(response.data.current)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <strong>temperature:</strong> {weather.temperature} Celcius
      </div>
      <div>
        <img src={weather.weather_icons} alt='weather' width='100' height='100' />
      </div>
      <div>
        <strong>wind:</strong> {weather.wind_speed} kph direction {weather.wind_dir}
      </div>
    </div>
  )
}

export default Weather