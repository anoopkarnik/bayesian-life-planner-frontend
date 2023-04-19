import React from 'react'

const TopBoxData = (props) => {
  return (
    <div className='alert alert-primary'>
        <span>{props.name}: Rs {props.value}</span>
    </div>
  )
}

export default TopBoxData