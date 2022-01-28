import styles from "./styles/App.module.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ItemPage from "./ItemPage";
import { AppProvider } from "../context";

const App = () => {
  const [finalizedQuery, setFinalizedQuery] = useState("name");
  const [finalizedSearch, setFinalizedSearch] = useState("");
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
        isShowingMobileView,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setFinalizedQuery={setFinalizedQuery}
              setFinalizedSearch={setFinalizedSearch}
            />
          }
        />

        <Route
          path="results"
          element={
            <>
              <NavBar
                setFinalizedQuery={setFinalizedQuery}
                setFinalizedSearch={setFinalizedSearch}
              />
              <ResultsPage
                finalizedQuery={finalizedQuery}
                finalizedSearch={finalizedSearch}
              />
            </>
          }
        />
        <Route
          path="results/:name"
          element={
            <>
              <NavBar
                setFinalizedQuery={setFinalizedQuery}
                setFinalizedSearch={setFinalizedSearch}
              />
              <ItemPage />
            </>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
