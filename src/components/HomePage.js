import Logo from "./Logo";
import { useRef, useEffect } from "react";
import { queryParams } from "../data";
import { useGlobalContext } from "../context";
import { useHistory } from "react-router-dom";
import SearchButton from "./SearchButton";
import styles from "./styles/HomePage.module.css";

const Button = ({ button, selected, changeSelected }) => {
  return (
    <button
      onClick={() => changeSelected(button)}
      className={`${styles.navButton} ${
        selected.toLowerCase() === button.toLowerCase()
          ? styles.bottomBorder
          : ""
      }`}
    >
      {button.toUpperCase()}
    </button>
  );
};

const NavBar = ({ buttons, selected, changeSelected }) => {
  return (
    <div className={styles.navBar}>
      {buttons.map((button) => (
        <Button
          key={button}
          button={button}
          selected={selected}
          changeSelected={changeSelected}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  const buttons = queryParams;
  const inputRef = useRef(undefined);
  const {
    selected,
    setSelected,
    searched,
    setSearched,
    setFinalizedSearch,
    setFinalizedSelected,
  } = useGlobalContext();
  const history = useHistory();

  const changeSelected = (button) => {
    setSelected(button);
  };

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(searched);
    setFinalizedSelected(selected);
    history.push("/results");
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    inputElement.focus();
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.homePageLogo}>
          <Logo />
        </div>
        <NavBar
          buttons={buttons}
          selected={selected}
          changeSelected={changeSelected}
        />
        <form className={styles.homeInputForm} onSubmit={(e) => submit(e)}>
          <div className={styles.inputContainer}>
            <input
              className={styles.homeInput}
              style={{ height: "3rem" }}
              type="text"
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
              ref={inputRef}
              placeholder={`Seach by ${selected}`}
            />
          </div>
          <SearchButton />
        </form>
      </section>
    </>
  );
};

export default HomePage;
