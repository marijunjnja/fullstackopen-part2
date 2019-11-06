import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {

  const languages = country.languages.map(language => 
    language.name)

  return (
    <div>
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </div>
      <div>
        <h2>languages</h2>
        <ul>
          {languages.map(language => <li>{language}</li>)}
        </ul>
        <img src={country.flag} alt='country flag' width='200' height='150'/>
      </div>
      <Weather country={country} />
    </div>
  )
}

export default Country