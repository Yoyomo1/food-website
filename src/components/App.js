import styles from "./styles/App.module.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ItemPage from "./ItemPage";
import { AppProvider } from "../context";

const App = () => {
  // State variable for current selected query
  const [selected, setSelected] = useState("name");

  // State variable for input form control parameter (search param)
  const [searched, setSearched] = useState("");

  // Need another search state to trigger re-render when form is submitted
  const [finalizedSearch, setFinalizedSearch] = useState("");
  const [finalizedSelected, setFinalizedSelected] = useState("");

  const [isShowingMobileView, setIsShowingMobileView] = useState(false);

  // Adds search text when the layout switches to mobile view
  // Remember to update width if the css is changed
  const handleResize = () => {
    if (window.innerWidth <= 377) {
      setIsShowingMobileView(true);
    } else {
      setIsShowingMobileView(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <AppProvider
      value={{
        selected,
        setSelected,
        searched,
        setSearched,
        finalizedSearch,
        setFinalizedSearch,
        finalizedSelected,
        setFinalizedSelected,
        isShowingMobileView,
      }}
    >
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/results" exact>
          <ResultsPage />
        </Route>
        <Route path="/results/:name" exact>
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
