import React from "react";
import { useState } from "react";
import s from "./Searchbar.module.css";

const Searchbar = ({ onHandleSubmit }) => {
  const [keyword, setKeyword] = useState("");

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (keyword.trim() === "") {
      return alert("Please enter a value to search images");
    }
    onHandleSubmit(keyword);
    setKeyword("");
  };

  return (
    <div>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={onSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={({ target }) => setKeyword(target.value)}
          />
        </form>
      </header>
    </div>
  );
};

export default Searchbar;
