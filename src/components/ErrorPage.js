import React from 'react'
import Logo from './Logo'
import '../styles/ErrorPage.css'

const Header = ({text}) => {
    return (
        <h1 className='error-message'>
            {text}
        </h1>
    )
}

const Link = ({text, link}) => {
    return (
        <a href={link} className='link'>
            {text.toUpperCase()}
        </a>  
    )
}

const ErrorPage = () => {

    const errorMessage = "Sorry! We could not find the page you're looking for!"
    const homeText = "home"
    const homeLink = '/'

    return (
        <div>
            <Logo />
            <div className='flex-container'>
                <Header text={errorMessage}/>
                <Link text={homeText} link={homeLink}  />
            </div>
        </div>
    )
}

export default ErrorPage
