import React from "react";
import "../styles/NavBar.css";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <>
      <nav className="nav-container">
        <Logo />
        <form action="">
          <select className="query">
            <option value="name">name</option>
            <option value="ingredient">ingredient</option>
            <option value="category">category</option>
            <option value="area">area</option>
          </select>
          <div className="input-container">
            <input type="text" />
            <button className="btn"></button>
          </div>
        </form>
      </nav>
    </>
  );
};

export default NavBar;
