import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetRecipeByName } from "../Actions";
import styles from "./Styles/SearchBar.module.css";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSetName = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleSearchTitle = (e) => {
    e.preventDefault();
    dispatch(GetRecipeByName(title));
    setTitle("");
  };
  return (
    <div className={styles.cont}>
      <input
        className={styles.search}
        type="text"
        value={title}
        placeholder="Search Recipe by Name"
        onChange={(e) => handleSetName(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSearchTitle(e)}
        className={styles.btnS}
      >
        Search
      </button>
    </div>
  );
}
