import React from "react";
import searchImgSource from "../imgs/search-btn.svg";
import styles from "./styles/SearchButton.module.css";

const SearchButton = () => {
  return (
    <button type="submit" className={styles.searchBtnSmall}>
      <img src={searchImgSource} alt="" className={styles.searchImg} />
      Search
    </button>
  );
};

export default SearchButton;
