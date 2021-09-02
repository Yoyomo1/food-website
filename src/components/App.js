import "../styles/App.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
// import ErrorPage from "./ErrorPage";
import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ItemPage from "./ItemPage";

const queryParams = ["name", "ingredient", "category", "area"];

const App = () => {
  // State variable for current selected query
  const [selected, setSelected] = useState("name");

  // State variable for input form control parameter (search param)
  const [searched, setSearched] = useState("");

  // Need another search state to trigger re-render when form is submitted
  const [finalizedSearch, setFinalizedSearch] = useState("");

  const history = useHistory();
  const location = useLocation();

  const isValidQuery = () => {
    const inputQuery = queryParams.find((query) => query === selected);
    return inputQuery ? true : false;
  };

  const setURL = () => {
    if (isValidQuery(selected) && finalizedSearch !== "") {
      history.push(
        `${location.pathname}?query=${selected}&search=${finalizedSearch}`
      );
      // Fetch data
    }
    // Invalid query parameter
    else if (!isValidQuery()) {
      // Display model with error
      console.log("INVALID query param");
    }
  };

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

        if (queryParam !== selected || searchParam !== finalizedSearch) {
          setSelected(queryParam);
          setSearched(searchParam);
          setFinalizedSearch(searchParam);
        }
      }
    };
    parseURL();
    setURL();
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
          queryParams={queryParams}
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
