import React, { useEffect, useState } from "react";
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
  finalizedSelected,
  setFinalizedSelected,
}) => {
  const [isShowingMobileView, setIsShowingMobileView] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(searched);
    setFinalizedSelected(selected);
    setURL(selected, searched);
  };

  // Adds search text when the layout switches to mobile view
  // Remember to update width if the css is changed
  const handleResize = () => {
    if (window.innerWidth <= 377) {
      setIsShowingMobileView(true);
    } else {
      setIsShowingMobileView(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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
