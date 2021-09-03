import React from "react";
import "../styles/NavBar.css";
import Logo from "./Logo";
import { useHistory, useLocation } from "react-router-dom";
import { queryParams } from "../data";

const NavBar = ({
  selected,
  setSelected,
  searched,
  setSearched,
  finalizedSearch,
  setFinalizedSearch,
}) => {
  const history = useHistory();
  const location = useLocation();

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(searched);
    setURL(selected, searched);
  };

  const setURL = (selected, searched) => {
    const isValidQuery = () => {
      const inputQuery = queryParams.find((query) => query === selected);
      return inputQuery ? true : false;
    };

    if (isValidQuery(selected) && searched !== "") {
      history.push(`${location.pathname}?query=${selected}&search=${searched}`);
      // Fetch data
    }
    // Invalid query parameter
    else if (!isValidQuery()) {
      // Display model with error
      console.log("INVALID query param");
    }
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
            onChange={(e) => setSelected(e.target.value)}
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
