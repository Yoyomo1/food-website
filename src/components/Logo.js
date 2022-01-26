import React from 'react'
import styles from "./styles/Logo.module.css"
import { Link } from "react-router-dom";

const Logo = () => {

  const text = "F o o (d)"

  return (
    <Link to='/' className={styles.logoLink}>
      <div className={styles.border}>
        <div className={styles.text}>{text}</div>
      </div>
    </Link>
  )
}

export default Logo