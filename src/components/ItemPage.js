import React, { useState, useEffect } from "react";
import "../styles/ItemPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemPage = () => {
  const { name } = useParams();
  const [info, setInfo] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = (obj) => {
      let count = 1;
      const ingredients = [];
      while (
        obj[`strIngredient${count}`] !== "" &&
        obj[`strIngredient${count}`] !== undefined
      ) {
        if (
          obj[`strIngredients${count}`] === "" ||
          obj[`strMeasure${count}`] === ""
        ) {
          throw new Error(
            "Number of ingredients don't match the number of measurements in the api call"
          );
        }
        ingredients.push({
          name: obj[`strIngredient${count}`],
          measurement: obj[`strMeasure${count}`],
        });
        count++;
      }
      return ingredients;
    };

    if (name !== undefined) {
      const actualName = name.replaceAll("-", " ");
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${actualName}`
        )
        .then((meals) => {
          // Get first meal in response object
          const { strMeal, strArea, strMealThumb, strYoutube } =
            meals.data.meals[0];
          const embeddedURL = strYoutube.replace("watch?v=", "embed/");
          setIngredients(getIngredients(meals.data.meals[0]));
          setInfo({ strMeal, strArea, strMealThumb, embeddedURL });
        });
    }
  }, [name, setIngredients]);

  return (
    <>
      {/* <NavBar /> */}
      <div className="content-section">
        <div className="item-grid-container">
          <section className="name-section">
            <h1 className="name">{info.strMeal}</h1>
            <p>{info.strArea}</p>
          </section>
          <section className="image-section">
            <img className="meal-img" src={info.strMealThumb} alt="meal" />
          </section>
          <section className="ingredients-section">
            <h2 className="ingredients-header">Ingredients</h2>
            {ingredients.map(({ name, measurement }) => {
              return (
                <div key={name} className="ingredient">
                  <p className="ingredient-name">{name}</p>
                  <p className="measurement">{measurement}</p>
                </div>
              );
            })}
          </section>
          <section className="youtube-section">
            <iframe
              className="youtube-video"
              title="instructional video"
              src={info.embeddedURL}
              frameBorder="0"
            ></iframe>
          </section>
        </div>
      </div>
    </>
  );
};

export default ItemPage;
