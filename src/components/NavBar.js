import { useState } from "react";
import "../styles/NavBar.css";
import Logo from "./Logo";
import { useGlobalContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useFormInput from "../custom-hooks/useFormInput";

const NavBar = ({ setFinalizedQuery, setFinalizedSearch }) => {
  const { isShowingMobileView } = useGlobalContext();
  const [isToggled, setIsToggled] = useState(false);
  const search = useFormInput("");
  const query = useFormInput("name");

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(search.value);
    setFinalizedQuery(query.value);
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
            <SelectMenu query={query} />
            <input
              type="text"
              className="nav-bar-input"
              placeholder={`Search by ${search.value}`}
              {...search}
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
            <SelectMenu {...query} />
            <div className="nav-input-container">
              <input
                type="text"
                className="nav-bar-input"
                placeholder={`Search by ${search.value}`}
                {...search}
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

const SelectMenu = (props) => {
  return (
    <select className="query" name="query" {...props}>
      <option value="name">name</option>
      <option value="ingredient">ingredient</option>
      <option value="category">category</option>
      <option value="area">area</option>
    </select>
  );
};

export default NavBar;
