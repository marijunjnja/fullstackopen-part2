import React from 'react'

const Form = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName}
                onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber}
                onChange={props.handleNumberChange} />
    </div>
    <div>
      <button onClick={props.addPerson}>
        add
      </button>
    </div>
  </form>
)

export default Form