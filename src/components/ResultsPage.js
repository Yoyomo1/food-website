import React from "react";
import NavBar from "./NavBar";
import "../styles/ResultsPage.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import data from '../data'

const Result = ({result}) => {
  return (
    <div className='result-container'>
      <img src={result.strMealThumb} alt="Picture did not load" className='result-image' />
    </div>
  )
}

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
  )
}


export default ResultsPage;
