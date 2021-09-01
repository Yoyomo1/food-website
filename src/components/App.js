import "../styles/App.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from "react";

const App = () => {
  // State variable for current selected query
  const [selected, setSelected] = useState("name");

  // State variable for input form control parametera
  const [searched, setSearched] = useState("");

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage
            selected={selected}
            setSelected={setSelected}
            searched={searched}
            setSearched={setSearched}
          />
        </Route>
        <Route path="/results">
          <ResultsPage
            selected={selected}
            setSelected={setSelected}
            searched={searched}
            setSearched={setSearched}
          />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
