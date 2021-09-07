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
  // console.log(results);
  if (results && results.length > 0) {
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
    finalizedSelected,
    setFinalizedSelected,
  } = useGlobalContext();

  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = () => {
      const changeResults = (response) => {
        const newResults = response.data.meals;
        console.log(newResults);
        setResults(newResults);
      };
      // console.log(finalizedSelected, finalizedSearch);
      switch (finalizedSelected) {
        case "name":
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/search.php?s=${finalizedSearch}`
            )
            .then((response) => {
              console.log("name");
              changeResults(response);
            });
          break;
        case "ingredient":
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?i=${finalizedSearch}`
            )
            .then((response) => {
              console.log("ingredient");
              changeResults(response);
            });
          break;
        case "category":
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${finalizedSearch}`
            )
            .then((response) => {
              console.log("area");
              changeResults(response);
            });
          break;
        default:
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${finalizedSearch}`
            )
            .then((response) => {
              console.log("area", finalizedSelected);
              changeResults(response);
            });
      }
    };

    getResults();
  }, [finalizedSearch, finalizedSelected]);
  return (
    <>
      <NavBar
        selected={selected}
        setSelected={setSelected}
        searched={searched}
        setSearched={setSearched}
        finalizedSearch={finalizedSearch}
        setFinalizedSearch={setFinalizedSearch}
        setURL={setURL}
        finalizedSelected={finalizedSelected}
        setFinalizedSelected={setFinalizedSelected}
      />
      <ResultsGrid results={results} />
    </>
  );
};

export default ResultsPage;
