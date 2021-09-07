import React from "react";
import searchImgSource from "../imgs/search-btn.svg";
import "../styles/SearchButton.css";

const SearchButton = () => {
  return (
    <button type="submit" className="search-btn-small">
      <img src={searchImgSource} alt="" className="search-img" />
      Search
    </button>
  );
};

export default SearchButton;
