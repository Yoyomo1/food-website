import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "../styles/ResultsPage.css";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";

const Result = ({ result }) => {
  const urlString = `/results/${result.strMeal.replaceAll(" ", "-")}`;
  return (
    <Link to={urlString} className="result-container">
      <img src={result.strMealThumb} alt="food" className="result-image" />
      <div className="result-text">{result.strMeal}</div>
    </Link>
  );
};

const ResultsGrid = ({ results }) => {
  if (results) {
    return (
      <div className="results-grid-container">
        {results.map((result) => (
          <Result key={result.idMeal} result={result} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="no-results-text">
        We could not find any results matching your search :(
      </div>
    );
  }
};

const ResultsPage = () => {
  const {
    setURL,
    selected,
    setSelected,
    searched,
    setSearched,
    finalizedSearch,
    setFinalizedSearch,
  } = useGlobalContext();

  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = () => {
      const changeResults = (response) => {
        const newResults = response.data.meals;
        setResults(newResults);
      };

      switch (selected) {
        case "name":
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/search.php?s=${finalizedSearch}`
            )
            .then((response) => {
              changeResults(response);
            });
          break;
        case "ingredient":
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?i=${finalizedSearch}`
            )
            .then((response) => {
              console.log("bruh");
              changeResults(response);
            });
          break;
        case "category":
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${finalizedSearch}`
            )
            .then((response) => {
              changeResults(response);
            });
          break;
        default:
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${finalizedSearch}`
            )
            .then((response) => {
              changeResults(response);
            });
      }
    };

    getResults();
  }, [finalizedSearch, selected]);

  return (
    <div>
      <div className="container">
        <NavBar
          selected={selected}
          setSelected={setSelected}
          searched={searched}
          setSearched={setSearched}
          finalizedSearch={finalizedSearch}
          setFinalizedSearch={setFinalizedSearch}
          setURL={setURL}
        />
      </div>
      <ResultsGrid results={results} />
    </div>
  );
};

export default ResultsPage;
