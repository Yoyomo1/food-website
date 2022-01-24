import "../styles/HomePage.css";
import Logo from "./Logo";
import { useRef, useEffect } from "react";
import { queryParams } from "../data";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";

const Button = ({ button, selected, changeSelected }) => {
  return (
    <button
      onClick={() => changeSelected(button)}
      className={`nav-button ${
        selected.toLowerCase() === button.toLowerCase() ? "bottom-border" : ""
      }`}
    >
      {button.toUpperCase()}
    </button>
  );
};

const NavBar = ({ buttons, selected, changeSelected }) => {
  return (
    <div className="nav-bar">
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
  const navigate = useNavigate();

  const changeSelected = (button) => {
    setSelected(button);
  };

  const submit = (e) => {
    e.preventDefault();
    setFinalizedSearch(searched);
    setFinalizedSelected(selected);
    navigate("/results", { query: selected, search: searched });
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
        <NavBar
          buttons={buttons}
          selected={selected}
          changeSelected={changeSelected}
        />
        <form className="home-input-form" onSubmit={(e) => submit(e)}>
          <div className="input-container">
            <input
              className="home-input"
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
