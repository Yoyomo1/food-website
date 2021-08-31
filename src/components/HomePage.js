import React, {useState} from 'react'
import '../styles/HomePage.css'
import Logo from './Logo'

const Button = ({button, selected, changeSelected}) => {
  if (selected.toLowerCase() === button.toLowerCase()){
    return (
      <button onClick={() => changeSelected(button)} className='selected-nav-button'>
         {button.toUpperCase()}
      </button>
    )
  } else {
    return (
      <button onClick={() => changeSelected(button)} className='nav-button'>
         {button.toUpperCase()}
      </button>
    )
  }
}

const NavBar = ({buttons, selected, changeSelected}) => {
  return (
    <div className='nav-bar'>
      {buttons.map(button => <Button key={button} button={button} selected={selected} changeSelected={changeSelected} />)}
    </div>
  )
}

const HomePage = () => {

  const buttons = ['name', 'ingredient', 'category', 'area']

  const [selected, setSelected] = useState('name')

  const changeSelected = (button) => {
    setSelected(button)
  }

  return (
    <div>
      <Logo />
      <NavBar buttons={buttons} selected={selected} changeSelected={changeSelected} />
    </div>
  )
}

export default HomePage