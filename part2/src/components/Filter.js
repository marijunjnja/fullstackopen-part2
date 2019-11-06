import React from 'react'

const Filter = (props) => (
  <div>
    filter name with <input value={props.filterName}
                        onChange={props.handleFilterName} />
  </div>
)

export default Filter