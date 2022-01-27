import React, { useState } from "react";
import styles from "./styles/NavBar.module.css";
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
      <nav className={styles.navContainer}>
        <div className={styles.centerLogo}>
          <Logo />
          <FontAwesomeIcon
            icon={faBars}
            className={`${styles.burgerMenu} ${isToggled ? styles.rotateBurger : ""}`}
            onClick={() => setIsToggled(!isToggled)}
          />
        </div>
        <div
          className={`${styles.dropDownMenuContainer} ${
            isToggled ? styles.showNavBar : ""
          }`}
        >

          <form className={styles.dropDownMenu} onSubmit={(e) => submit(e)}>
            <SelectMenu selexted={selected} setSelected={setSelected} />

            <input
              type="text"
              className={styles.navBarInput}
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
              placeholder={`Search by ${selected}`}
            />
            <button className={styles.btn} type="submit">
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
        <nav className={styles.navContainer}>
          <Logo />
          <form className={styles.selectInputContainer} onSubmit={(e) => submit(e)}>
            <SelectMenu selected={selected} setSelected={setSelected} />
            <div className={styles.navInputContainer}>
              <input
                type="text"
                className={styles.navBarInput}
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
                placeholder={`Search by ${selected}`}
              />
              <button className={styles.btn} type="submit">
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
      className={styles.query}
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
