import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  FilterRecipesByDiets,
  getDiets,
  FilterByCreate,
  FilterByName,
  FilterByScore,
} from "../Actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const AllRecipes = useSelector((state) => state.recipes);
  const AllDiets = useSelector((state) => state.diets);
  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [recipesPerPage, setRecipesPerPages] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = AllRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }
  function handleFilterDiets(e) {
    dispatch(FilterRecipesByDiets(e.target.value));
  }
  function handleFilterByCreate(e) {
    dispatch(FilterByCreate(e.target.value));
  }
  function handleFilterByName(e) {
    e.preventDefault();
    dispatch(FilterByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleFilterByScore(e) {
    e.preventDefault();
    dispatch(FilterByScore(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/recipe">Crear Receta</Link>
      <h1>Recetas de Comidas</h1>
      <SearchBar />
      {console.log(AllRecipes)}
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cagar todas las recetas
      </button>
      <div>
        <h3>Ordenamiento por Name </h3>
        <select
          onChange={(e) => {
            handleFilterByName(e);
          }}
        >
          <option disabled selected>
            Alphabetic Order
          </option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <h3>Ordenamiento por Creacion </h3>
        <select onChange={(e) => handleFilterByCreate(e)}>
          <option disabled selected>
            Order by Creation
          </option>
          <option value="All">All - API AND DATABASE</option>
          <option value="created">Recipe in DataBase </option>
          <option value="api">Recipe in API </option>
        </select>
        <h3>Ordenamiento por Score </h3>
        <select
          onChange={(e) => {
            handleFilterByScore(e);
          }}
        >
          <option disabled selected>
            Filter by Points
          </option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <h3>Ordenamiento por Diets </h3>
        <select onChange={(e) => handleFilterDiets(e)}>
          <option disabled selected>
            Search by Diets
          </option>
          <option value="All">All</option>
          {AllDiets &&
            AllDiets.map((e, i) => {
              return (
                <option key={i} value={e.name}>
                  {e.name}
                </option>
              );
            })}
        </select>
        <Paginado
          recipesPerPage={recipesPerPage}
          AllRecipes={AllRecipes.length}
          paginado={paginado}
        />
        {currentRecipes &&
          currentRecipes.map((e, i) => {
            return (
              <Link to={"/home/" + e.id}>
                <Card
                  key={i}
                  image={e.image}
                  title={e.title}
                  diets={e.Diets}
                  id={e.id}
                  score={e.spoonacularScore}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
