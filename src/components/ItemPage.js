import React from "react";
import NavBar from "./NavBar";
import "../styles/ItemPage.css";

const ItemPage = () => {
  return (
    <>
      <NavBar />
      <div className="content-section">
        <div className="item-grid-container">
          <section className="name-section">
            <h1>Name</h1>
            <h4>Area</h4>
          </section>
          <section className="ingredients-section">
            <h2 className="ingredients-header">Ingredients</h2>
            <div className="ingredient">
              <p className="ingredient-name">Name of ingredient</p>
              <p className="measurement"> 3/4 cup</p>
            </div>
            <div className="ingredient">
              <p className="ingredient-name">Name of ingredient</p>
              <p className="measurement"> 3/4 cup</p>
            </div>
          </section>
          <section className="image-section center">
            <div className="img-placeholder"></div>
          </section>
          <section className="youtube-section">
            <div className="img-placeholder"></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ItemPage;
