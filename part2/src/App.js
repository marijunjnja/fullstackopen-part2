import React, { useState, useEffect } from 'react'

import Number from './components/Number'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import numberService from './services/numbers'
import './index.css'

const App = (props) => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const hook = () => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(hook, [])

  const filterPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filterName))
  const personsToShow = filterName
    ? filterPersons
    : persons

  const checkPersons = persons.filter(person => {
    if (person.name === newName) {
      return person.id
    }
    return false
  })
  const checkNumber = (person, number) => {
    numberService
      .getOne(person.id)
      .then(response => {
        console.log(response)
        if (response === 404) {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        } else if (response.number !== number) {
          confirmNumberChange(response, number)
        } else {
          alert(`${response.name} already exists with number ${number}`)
        }
      })
  }
  
  const createNewNumber = (personObject) => {
    numberService
      .create(personObject)
      .then(returnedNumber => {
        setPersons(persons.concat(returnedNumber))
        setSuccessMessage(
          `Added ${returnedNumber.name} with number ${returnedNumber.number}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }
  const confirmNumberChange = (personObject, number) => {
    let result = window.confirm(`Are you sure you want to change ${personObject.name}'s number to ${number}?`)
    if (result) {
      const changedPerson = { ...personObject, number: number }
      numberService
        .update(personObject.id, changedPerson)
        .then(returnedNumber => {
          setPersons(persons.map(person => 
            person.id !== personObject.id
            ? person : returnedNumber))
          setSuccessMessage(
            `Changed ${returnedNumber.name}'s number to ${returnedNumber.number}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { 
      name: newName ,
      number: newNumber
    }
    let exists = checkPersons[0]
    console.log('exists', exists)
    exists
      ? checkNumber(exists, personObject.number)
      : createNewNumber(personObject)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterName = (event) => setFilterName(event.target.value)
  
  const deletePerson = (person) => {
    let result = window.confirm(`Do you really want to delete ${person.name}?`)

    if (result) {
      numberService
        .remove(person.id)
        .then(response => {
          numberService
            .getAll()
            .then(resolve => {
              setPersons(resolve)
            })
        })
    }
  }

  const rows = () => personsToShow.map(person => 
    <Number 
      key={person.name}
      person={person}
      deletePerson={() => deletePerson(person)}
    />
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} appliedClass='success' />
      <Notification message={errorMessage} appliedClass='error' />

      <Filter 
        filterName={filterName}
        handleFilterName={handleFilterName}
      />
      <h2>add a new</h2>
      <Form 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App