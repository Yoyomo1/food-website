import React from 'react'
import "../styles/Logo.css"
import { Link } from "react-router-dom";

const Logo = () => {

  const text = "F o o (d)"

  return (
    <Link to='/' className='logo-link'>
      <div className="border">
        <div className="text">{text}</div>
      </div>
    </Link>
  )
}

export default Logo