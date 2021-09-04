import "../styles/App.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ItemPage from "./ItemPage";
import { AppProvider } from "../context";
import { queryParams } from "../data";

const baseURL = "www.themealdb.com/api/json/v1/1/search.php?";

const App = () => {
  // State variable for current selected query
  const [selected, setSelected] = useState("name");

  // State variable for input form control parameter (search param)
  const [searched, setSearched] = useState("");

  // Need another search state to trigger re-render when form is submitted
  const [finalizedSearch, setFinalizedSearch] = useState("");

  const location = useLocation();
  const history = useHistory();

  // Set url functions is required in the nav bar and home page
  // or any input box that sends a get request
  const setURL = (selected, searched) => {
    const isValidQuery = () => {
      const inputQuery = queryParams.find((query) => query === selected);
      return inputQuery ? true : false;
    };

    if (isValidQuery(selected) && searched !== "") {
      history.push(`/results/?query=${selected}&search=${searched}`);
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

        setSelected(queryParam);
        setSearched(searchParam);
        setFinalizedSearch(searchParam);
      }
    };

    parseURL();
  }, [selected, finalizedSearch, location.search, location]);

  return (
    <AppProvider
      value={{
        setURL,
        selected,
        setSelected,
        searched,
        setSearched,
        finalizedSearch,
        setFinalizedSearch,
      }}
    >
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/results" exact>
          <ResultsPage />
        </Route>
        <Route path="/test" exact>
          <ItemPage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </AppProvider>
  );
};

export default App;
