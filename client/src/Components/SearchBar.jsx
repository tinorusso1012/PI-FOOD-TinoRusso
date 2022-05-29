import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetRecipeByName } from "../Actions";
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
    <div>
      <input
        type="text"
        value={title}
        placeholder="Search Recipe by Name"
        onChange={(e) => handleSetName(e)}
      />
      <button type="submit" onClick={(e) => handleSearchTitle(e)}>
        Search
      </button>
    </div>
  );
}
