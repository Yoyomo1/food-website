import React from "react";
import Logo from "./Logo";
import styles from "./styles/ErrorPage.module.css";

const Header = ({ text }) => {
  return <h1 className={styles.errorMessage}>{text}</h1>;
};

const Link = ({ text, link }) => {
  return (
    <a href={link} className={styles.link}>
      {text.toUpperCase()}
    </a>
  );
};
//className={styles.homepage-logo} removed on line 24(Logo div)
const ErrorPage = () => {
  const errorMessage = "Sorry! We could not find the page you're looking for!";
  const homeText = "home";
  const homeLink = "/";

  return (
    <div>
      <div> 
         <Logo />
      </div>
      <div className="flex-container">
        <Header text={errorMessage} />
        <Link text={homeText} link={homeLink} />
      </div>
    </div>
  );
};

export default ErrorPage;
