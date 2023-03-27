import React from 'react'
import { Link } from 'react-router-dom'
import "./accord.css"

function Accord({title}) {
  return (
    <div className='accordLinkContainer'>
    <h2>{title}</h2>
  <div className='accordLinks'>
    <Link className='linkF' to="/">Home</Link>
    
      <button className='accordBackButton'>{title}</button>
    
  </div>
  </div>
  )
}

export default Accord