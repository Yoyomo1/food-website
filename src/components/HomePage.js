import "../styles/HomePage.css";
import Logo from "./Logo";
import { useHistory } from "react-router-dom";

const Button = ({ button, selected, changeSelected }) => {
  return (
    <button
      onClick={() => changeSelected(button)}
      className={
        selected.toLowerCase() === button.toLowerCase()
          ? "selected-nav-button"
          : "nav-button"
      }
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

const HomePage = ({ searched, setSearched, selected, setSelected }) => {
  const buttons = ["name", "ingredient", "category", "area"];
  const history = useHistory();

  const changeSelected = (button) => {
    setSelected(button);
  };

  const submit = (e) => {
    e.preventDefault();
    history.push("/results");
  };

  return (
    <div>
      <Logo />

      <section className="hero">
        <NavBar
          buttons={buttons}
          selected={selected}
          changeSelected={changeSelected}
        />
        <form onSubmit={(e) => submit(e)}>
          <div className="input-container">
            <input
              style={{ height: "3rem" }}
              type="text"
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
            />
            <button className="btn"></button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
