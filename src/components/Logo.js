import React from 'react'
import "../styles/Logo.css"

const Logo = () => {

  const text = "F o o (d)"

  return (
    <div className="border">
      <div className="text">{text}</div>
    </div>
  )
}

export default Logo