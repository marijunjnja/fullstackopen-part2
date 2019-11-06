import React from 'react'

const Notification = ({ message, appliedClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={appliedClass}>
      {message}
    </div>
  )
}

export default Notification