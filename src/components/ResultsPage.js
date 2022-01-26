import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import styles from "./styles/ResultsPage.module.css";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";

const Result = ({ result }) => {
  const urlString = `/results/${result.strMeal.replaceAll(" ", "-")}`;
  return (
    <Link to={urlString} className={styles.resultContainer}>
      <img src={result.strMealThumb} alt="food" className={styles.resultImage} />
      <div className={styles.resultText}>{result.strMeal}</div>
    </Link>
  );
};

const LoadingBars = () => {
  return (
    <div className={styles.loadingBars}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const ResultsGrid = ({ results, loaded }) => {
  if (loaded) {
    if (results && results.length > 0) {
      return (
        <div className={styles.resultsGridContainer}>
          {results.map((result) => (
            <Result key={result.idMeal} result={result} />
          ))}
        </div>
      );
    } else {
      return (
        <div className={styles.noResultsText}>
          We could not find any results matching your search :(
        </div>
      );
    }
  } else {
    return <LoadingBars />;
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

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    const getResults = () => {
      const changeResults = (response) => {
        const newResults = response.data.meals;
        setResults(newResults);
        setLoaded(true);
      };

      switch (finalizedSelected) {
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
      <ResultsGrid results={results} loaded={loaded} />
    </>
  );
};

export default ResultsPage;
