import React, { useState } from "react";
import "../styles/NavBar.css";
import Logo from "./Logo";
import { useGlobalContext } from "../context";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  const history = useHistory();
  const [isToggled, setIsToggled] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(searched);
    setFinalizedSelected(selected);
    history.push("/results");
  };

  // Mobile view with burger menu
  if (isShowingMobileView) {
    return (
      <nav className="nav-container">
        <div className="center-logo">
          <Logo />
          <FontAwesomeIcon
            icon={faBars}
            className={`burger-menu ${isToggled ? "rotate-burger" : ""}`}
            onClick={() => setIsToggled(!isToggled)}
          />
        </div>
        <div
          className={`drop-down-menu-container ${
            isToggled ? "show-nav-bar" : ""
          }`}
        >
          <form className="drop-down-menu" onSubmit={(e) => submit(e)}>
            <SelectMenu selexted={selected} setSelected={setSelected} />
            <input
              type="text"
              className="nav-bar-input"
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
              placeholder={`Search by ${selected}`}
            />
            <button className="btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
  // Desktop view
  else {
    return (
      <>
        <nav className="nav-container">
          <Logo />
          <form className="select-input-container" onSubmit={(e) => submit(e)}>
            <SelectMenu selected={selected} setSelected={setSelected} />
            <div className="nav-input-container">
              <input
                type="text"
                className="nav-bar-input"
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
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
  }
};

const SelectMenu = ({ selected, setSelected }) => {
  return (
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
  );
};

export default NavBar;
