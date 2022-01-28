import styles from "./styles/NavBar.module.css";
import { useState } from "react";
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
      <nav className={styles.navContainer}>
        <div className={styles.centerLogo}>
          <Logo />
          <FontAwesomeIcon
            icon={faBars}
            className={`${styles.burgerMenu} ${
              isToggled ? styles.rotateBurger : ""
            }`}
            onClick={() => setIsToggled(!isToggled)}
          />
        </div>
        <div
          className={`${styles.dropDownMenuContainer} ${
            isToggled ? styles.showNavBar : ""
          }`}
        >
          <form className={styles.dropDownMenu} onSubmit={(e) => submit(e)}>
            <SelectMenu query={query} />
            <input
              type="text"
              className={styles.navBarInput}
              placeholder={`Search by ${search.value}`}
              {...search}
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
          <form
            className={styles.selectInputContainer}
            onSubmit={(e) => submit(e)}
          >
            <SelectMenu {...query} />
            <div className={styles.navInputContainer}>
              <input
                type="text"
                className={styles.navBarInput}
                placeholder={`Search by ${search.value}`}
                {...search}
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

const SelectMenu = (props) => {
  return (
    <select className={styles.query} name="query" {...props}>
      <option value="name">name</option>
      <option value="ingredient">ingredient</option>
      <option value="category">category</option>
      <option value="area">area</option>
    </select>
  );
};

export default NavBar;
