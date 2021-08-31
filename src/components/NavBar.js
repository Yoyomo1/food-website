import React, { useRef, useEffect } from "react";
import "../styles/NavBar.css";
import Logo from "./Logo";

const NavBar = ({ selected, setSelected, searched, setSearched }) => {
  const selectedRef = useRef(undefined);

  useEffect(() => {
    selectedRef.current.value = selected;
  });

  return (
    <>
      <nav className="nav-container">
        <Logo />
        <form action="">
          <select className="query" name="query" ref={selectedRef}>
            <option value="name">name</option>
            <option value="ingredient">ingredient</option>
            <option value="category">category</option>
            <option value="area">area</option>
          </select>
          <div className="input-container">
            <input
              type="text"
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
            />
            <button className="btn"></button>
          </div>
        </form>
      </nav>
    </>
  );
};

export default NavBar;
