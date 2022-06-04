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
import styles from "./Styles/Home..module.css";
import pizza from "../Imagenes/PizzaLoading.gif";
import rataCocinando from "../Imagenes/RataImg.jpeg";

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
    setCurrentPage(1);
  }
  function handleFilterByCreate(e) {
    dispatch(FilterByCreate(e.target.value));
    setCurrentPage(1);
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
    <div className={styles.background}>
      {/* NavBar */}
      <div className={styles.NavBarPadre}>
        <Link to="/" className={styles.tittle}>
          <img
            src={rataCocinando}
            alt="img not found"
            className={styles.imgRat}
          />
        </Link>
        <Link to="/recipe" className={styles.CreateRecipe}>
          Create Recipe
        </Link>
        <SearchBar className={styles.search} />
        {console.log(AllRecipes)}
        <button
          className={styles.button}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload All Recipe
        </button>
      </div>
      <div className={styles.DivPadre}>
        <div>
          {console.log()}

          <br />

          {/* Filtros */}
          <div className={styles.filter}>
            <select
              onChange={(e) => {
                handleFilterByName(e);
              }}
              className={styles.selectFilter}
            >
              <option value="" disabled selected>
                Alphabetic Order
              </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <br />
            <select
              className={styles.selectFilter}
              onChange={(e) => handleFilterByCreate(e)}
            >
              <option value="" disabled selected>
                Order by Creation
              </option>
              <option value="All">All </option>
              <option value="created">Recipe Created </option>
              <option value="api">Recipe in API </option>
            </select>
            <br />
            <select
              className={styles.selectFilter}
              onChange={(e) => {
                handleFilterByScore(e);
              }}
            >
              <option value="" disabled selected>
                Filter by Points
              </option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
            <br />
            <select
              className={styles.selectFilter}
              onChange={(e) => handleFilterDiets(e)}
            >
              <option value="" disabled selected>
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
          </div>
          <br />
          {/* Paginado 1 */}
          <div className={styles.paginado1}>
            <Paginado
              recipesPerPage={recipesPerPage}
              AllRecipes={AllRecipes.length}
              paginado={paginado}
            />
          </div>
          {/* cards */}

          <div className={styles.DivCards}>
            {currentRecipes.length ? (
              currentRecipes.map((e, i) => {
                return (
                  <Link to={"/home/" + e.id}>
                    <Card
                      className={styles.cards}
                      key={i}
                      image={e.image}
                      title={e.title}
                      diets={e.diets}
                      id={e.id}
                      score={e.spoonacularScore}
                      servings={e.servings}
                      dishTypes={e.dishTypes}
                    />
                  </Link>
                );
              })
            ) : (
              <div className={styles.loader}>
                <img src={pizza} alt="img not found" />
              </div>
            )}
          </div>
          <div className={styles.paginado1}>
            {/* Paginado 2 */}
            <Paginado
              recipesPerPage={recipesPerPage}
              AllRecipes={AllRecipes.length}
              paginado={paginado}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
