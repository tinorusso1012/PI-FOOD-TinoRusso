import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const AllRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes);
  }

  return (
    <div>
      <Link to="/recipe">Crear Receta</Link>
      <h1>Recetas de Comidas</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cagar todas las recetas
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="punt-asc">P-Ascendente</option>
          <option value="punt-desc">P-Descendente</option>
        </select>
        <select>
          <option value="Gluten Free">Gluten Free</option>
          <option value="Ketogenic">Ketogenic</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
          <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Pescetarian">Pescetarian</option>
          <option value="Paleo">Paleo</option>
          <option value="Primal">Primal</option>
          <option value="Low-FODMAP">Low FODMAP</option>
          <option value="Whole30">Whole30</option>
        </select>
        {AllRecipes &&
          AllRecipes.map((e) => {
            return <Card image={e.image} title={e.title} diets={e.diets} id={e.id}/>;
          })}
      </div>
    </div>
  );
}
