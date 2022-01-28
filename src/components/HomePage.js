import Logo from "./Logo";
import { useRef, useEffect, useState } from "react";
import { queryParams } from "../data";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";
import styles from "./styles/HomePage.module.css";

const Button = ({ button, query, setQuery }) => {
  return (
    <button
      onClick={() => setQuery(button)}
      className={`${styles.navButton} ${
        query.toLowerCase() === button.toLowerCase() ? styles.bottomBorder : ""
      }`}
    >
      {button.toUpperCase()}
    </button>
  );
};

const Query = ({ buttons, query, setQuery }) => {
  return (
    <div className={styles.navBar}>
      {buttons.map((button) => (
        <Button
          key={button}
          button={button}
          query={query}
          setQuery={setQuery}
        />
      ))}
    </div>
  );
};

const HomePage = ({ setFinalizedQuery, setFinalizedSearch }) => {
  const buttons = queryParams;
  const inputRef = useRef(undefined);
  const navigate = useNavigate();
  const [query, setQuery] = useState("name");
  const [search, setSearch] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(search);
    setFinalizedQuery(query);
    navigate("results");
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
        <Query buttons={buttons} query={query} setQuery={setQuery} />
        <form className={styles.homeInputForm} onSubmit={(e) => submit(e)}>
          <div className={styles.inputContainer}>
            <input
              className={styles.homeInput}
              style={{ height: "3rem" }}
              type="text"
              ref={inputRef}
              placeholder={`Seach by ${query}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <SearchButton />
        </form>
      </section>
    </>
  );
};

export default HomePage;
