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

const ResultsGrid = ({getRequest}) => {
  //!!! parameters
  const results = getRequest().meals

  return (
    <div className='grid-container'>
      <div className='results-grid-container'>
        {results.map(result => <Result key={result.idMeal} result={result} /> )}
      </div>
    </div>
  )
}

const ResultsPage = ({ selected, setSelected, searched, setSearched }) => {

  const getRequest = () => {
    return data
  }

  return (
    <Router>
      <div className="container">
        <NavBar
          selected={selected}
          setSelected={setSelected}
          searched={searched}
          setSearched={setSearched}
        />
      </div>
      <ResultsGrid getRequest={getRequest}/>
    </Router>
    
  );
};

export default ResultsPage;
