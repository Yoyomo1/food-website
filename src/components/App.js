import "../styles/App.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
// import ErrorPage from "./ErrorPage";
import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ItemPage from "./ItemPage";
import axios from "axios";
import { queryParams } from "../data";

const App = () => {
  // State variable for current selected query
  const [selected, setSelected] = useState("name");

  // State variable for input form control parameter (search param)
  const [searched, setSearched] = useState("");

  // Need another search state to trigger re-render when form is submitted
  const [finalizedSearch, setFinalizedSearch] = useState("");

  const location = useLocation();

  useEffect(() => {
    // Parce on page reload or form submit
    const parseURL = () => {
      // Only parse URL if there are query params
      if (location.search !== "") {
        let search = location.search;
        // Remove ? at the start of the string
        search = search.replace("?", "");

        // Split string into [query=query, search=search]
        search = search.split("&");

        const queryParam = search[0].split("=")[1];
        const searchParam = search[1].split("=")[1];
        if (!(queryParam === selected || searchParam === finalizedSearch)) {
          setSelected(queryParam);
          setSearched(searchParam);
          setFinalizedSearch(searchParam);
        }
      }
    };

    parseURL();
    // setURL(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, finalizedSearch]);

  return (
    <Switch>
      <Route path="/" exact>
        <HomePage
          selected={selected}
          setSelected={setSelected}
          searched={searched}
          setSearched={setSearched}
          finalizedSearch={finalizedSearch}
          setFinalizedSearch={setFinalizedSearch}
        />
      </Route>
      <Route path="/results">
        <ResultsPage
          selected={selected}
          setSelected={setSelected}
          searched={searched}
          setSearched={setSearched}
          finalizedSearch={finalizedSearch}
          setFinalizedSearch={setFinalizedSearch}
        />
      </Route>
      <Route path="/test">
        <ItemPage
          selected={selected}
          setSelected={setSelected}
          searched={searched}
          setSearched={setSearched}
        />
      </Route>
      <Route path="*">{/* <ErrorPage /> */}</Route>
    </Switch>
  );
};

export default App;
