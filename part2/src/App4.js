import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'

const App = (props) => {
  const [ countries, setCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const filterCountries = countries.filter(country => 
    country.name.toLowerCase().includes(filterName))
  const countriesToShow = filterName
    ? filterCountries
    : countries

  const handleFilterName = (event) => setFilterName(event.target.value)

  const handleShowClick = (country) => {
    ReactDOM.render(
      <Country
        key='showCountry'
        country={country}
      />,
      document.getElementById('showCountry')
    )
  }

  const rows = () => {
    return countriesToShow.length > 10
      ? <div>Too many matches, specify another filter</div>
      : countriesToShow.length > 1
        ? countriesToShow.map(country => 
            <div>
              <Countries
                key={country.name}
                country={country}  
              />
              <button onClick={() => handleShowClick(country)}>
                show
              </button>
            </div>
          )
        : countriesToShow.map(country => 
            <Country 
              key={country.name} 
              country={country} 
            />
          )
  }

  return (
    <div>
      <Filter
        filterName={filterName}
        handleFilterName={handleFilterName}
      />
      <div>
        {rows()}
        <div id='showCountry'></div>
      </div>
    </div>
  )
}

export default App