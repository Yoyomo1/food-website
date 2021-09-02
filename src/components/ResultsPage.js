import React from "react";
import NavBar from "./NavBar";
import "../styles/ResultsPage.css";

const ResultsPage = ({
  selected,
  setSelected,
  searched,
  setSearched,
  finalizedSearch,
  setFinalizedSearch,
}) => {
  return (
    <div className="container">
      <NavBar
        selected={selected}
        setSelected={setSelected}
        searched={searched}
        setSearched={setSearched}
        finalizedSearch={finalizedSearch}
        setFinalizedSearch={setFinalizedSearch}
      />
    </div>
  );
};

export default ResultsPage;
