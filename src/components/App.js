import "../styles/App.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from "react";

const App = () => {

  const [selected, setSelected] = useState("name");
  const [searched, setSearched] = useState('')

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage selected={selected} setSelected={setSelected} searched={searched} setSearched={setSearched} />
        </Route>
        <Route path="/results">
          <ResultsPage />
        </Route>
        {/* Error page */}
        <Route path="*"></Route>
      </Switch>
    </Router>
  );
};

export default App;
