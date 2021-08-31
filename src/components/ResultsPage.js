import React from "react";
import NavBar from "./NavBar";
import "../styles/ResultsPage.css";

const ResultsPage = ({ selected, setSelected, searched, setSearched }) => {
  return (
    <div className="container">
      <NavBar
        selected={selected}
        setSelected={setSelected}
        searched={searched}
        setSearched={setSearched}
      />
    </div>
  );
};

export default ResultsPage;
