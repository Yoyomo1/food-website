import React from "react";
import "../styles/NavBar.css";
import Logo from "./Logo";
import { useGlobalContext } from "../context";

const NavBar = ({
  setURL,
  selected,
  setSelected,
  searched,
  setSearched,
  finalizedSearch,
  setFinalizedSearch,
  finalizedSelected,
  setFinalizedSelected,
}) => {
  const { isShowingMobileView } = useGlobalContext();

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(searched);
    setFinalizedSelected(selected);
    setURL(selected, searched);
  };

  return (
    <>
      <nav className="nav-container">
        <Logo />
        <form className="select-input-container" onSubmit={(e) => submit(e)}>
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
              className="nav-bar-input"
              value={searched}
              onChange={(e) => {
                setSearched(e.target.value);
              }}
              placeholder={`Search by ${selected}`}
            />
            <button className="btn" type="submit">
              {isShowingMobileView ? "Search" : ""}
            </button>
          </div>
        </form>
      </nav>
    </>
  );
};

export default NavBar;
