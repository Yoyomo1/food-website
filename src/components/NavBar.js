import React from "react";
import "../styles/NavBar.css";
import Logo from "./Logo";

const NavBar = ({
  setURL,
  selected,
  setSelected,
  searched,
  setSearched,
  finalizedSearch,
  setFinalizedSearch,
}) => {
  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(searched);

    setURL(selected, searched);
  };

  return (
    <>
      <nav className="nav-container">
        <Logo />
        <form onSubmit={(e) => submit(e)}>
          <select
            className="query"
            name="query"
            value={selected}
            onChange={(e) => {
              setURL(e.target.value, searched);
              setSelected(e.target.value);
            }}
          >
            <option value="name">name</option>
            <option value="ingredient">ingredient</option>
            <option value="category">category</option>
            <option value="area">area</option>
          </select>
          <div className="input-container">
            <input
              type="text"
              value={searched}
              onChange={(e) => {
                setSearched(e.target.value);
              }}
            />
            <button className="btn" type="submit"></button>
          </div>
        </form>
      </nav>
    </>
  );
};

export default NavBar;
