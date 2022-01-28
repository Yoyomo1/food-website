import "../styles/HomePage.css";
import Logo from "./Logo";
import { useRef, useEffect, useState } from "react";
import { queryParams } from "../data";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";

const Button = ({ button, query, setQuery }) => {
  return (
    <button
      onClick={() => setQuery(button)}
      className={`nav-button ${
        query.toLowerCase() === button.toLowerCase() ? "bottom-border" : ""
      }`}
    >
      {button.toUpperCase()}
    </button>
  );
};

const Query = ({ buttons, query, setQuery }) => {
  return (
    <div className="nav-bar">
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
      <section className="hero">
        <div className="homepage-logo">
          <Logo />
        </div>
        <Query buttons={buttons} query={query} setQuery={setQuery} />
        <form className="home-input-form" onSubmit={(e) => submit(e)}>
          <div className="input-container">
            <input
              className="home-input"
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
