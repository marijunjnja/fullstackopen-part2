import React from 'react'

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({course}) => {
  // eslint-disable-next-line
  const { name, parts } = course
  return (
    <div>
      { parts.map(part => <Part key={part.id} part={part} />) }
    </div>
  )
}

export default Content