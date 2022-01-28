import React, { useState, useEffect } from "react";
import styles from "./styles/ItemPage.module.css";
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
      <div className={styles.contentSection}>
        <div className={styles.itemGridContainer}>
          <section className={styles.nameSection}>
            <h1 className={styles.name}>{info.strMeal}</h1>
            <p>{info.strArea}</p>
          </section>
          <section className={styles.imageSection}>
            <img
              className={styles.mealImg}
              src={info.strMealThumb}
              alt="meal"
            />
          </section>
          <section className={styles.ingredientsSection}>
            <h2 className={styles.ingredientsHeader}>Ingredients</h2>
            {ingredients.map(({ name, measurement }) => {
              return (
                <div key={name} className={styles.ingredient}>
                  <p className={styles.ingredientName}>{name}</p>
                  <p className={styles.measurement}>{measurement}</p>
                </div>
              );
            })}
          </section>
          <section className={styles.youtubeSection}>
            <iframe
              className={styles.youtubeVideo}
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
