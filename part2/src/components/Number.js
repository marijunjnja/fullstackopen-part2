import React from 'react'

const Number = ({ person, deletePerson }) => (
  <li>
    {person.id} {person.name} {person.number} 
    <button onClick={deletePerson}>delete</button>
  </li>
)

export default Number