import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetRecipeById, getDetailsreset } from "../Actions/index";
import { useEffect } from "react";
import styles from "./Styles/Detail.module.css";
import pizza from "../Imagenes/PizzaLoading.gif";
export default function Detail(prop) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetRecipeById(prop.match.params.id));
    dispatch(getDetailsreset());
  }, [dispatch]);
  const myRecipe = useSelector((state) => state.detail);
  return (
    <div className={styles.background}>
      {console.log(myRecipe)}
      {/* NavBar */}
      <div className={styles.contNavBarPadre}>
        <Link to="/" className={styles.title}>
          Recipers
        </Link>
        <Link to="/home">
          <button className={styles.button}>Home</button>
        </Link>
        <Link to="/recipes" className={styles.contCraeteRecipe}>
          Create Recipe
        </Link>
      </div>
      <div className={styles.divPadre}>
        {myRecipe.length === 0 ? (
          <img
            className={styles.pizzaLoading}
            src={pizza}
            alt="img not found"
          />
        ) : (
          <div className={styles.contDetailsPadre}>
            <div className={styles.contDetailOne}>
              {console.log(myRecipe)}

              {/* IMAGEN */}
              <div className={styles.contDetailImgPadre}>
                <div className={styles.contDetailImg}>
                  <img src={myRecipe.image} alt="Img not found" />
                  <img
                    src="https://c.tenor.com/hh_turxGNkMAAAAC/abell46s-ternura.gif"
                    alt="Img not Found"
                  />
                </div>
              </div>

              {/* TEXTO */}
              <div className={styles.contDetailInfoPadre}>
                <div className={styles.contDetailInfo}>
                  <h1>{myRecipe.title}</h1>
                  <h4>
                    <span>Score:</span>{" "}
                  </h4>
                  <p>{myRecipe.spoonacularScore}</p>
                  <h4>
                    <span>Time Preparation:</span>{" "}
                  </h4>
                  <p>{myRecipe.readyInMinutes}</p>
                  <h4>
                    <span>Health Score: </span>{" "}
                  </h4>
                  <p>{myRecipe.healtScore}</p>
                  <h4>
                    <span>Servings: </span>
                    {myRecipe.servings}
                  </h4>

                  <h3>
                    <span>Diet Type:</span>{" "}
                  </h3>
                  <p className={styles.p1}>
                    {myRecipe.diets &&
                      myRecipe.diets.map((e, i) => <li key={i}>{e.name}</li>)}
                  </p>
                  <h3>
                    <span>Dish Type:</span>{" "}
                  </h3>
                  <p className={styles.p1}>
                    {myRecipe.dishTypes &&
                      myRecipe.dishTypes.map((e, i) => (
                        <li key={i}>{e.name}</li>
                      ))}
                  </p>
                </div>
              </div>
            </div>
            {/* Conteiner 2 */}
            <div className={styles.contDetailTwo}>
              <div className={styles.contDetailTwoSummary}>
                <h4>
                  <span>Summary:</span>
                </h4>
                <h4>{myRecipe.summary}</h4>
              </div>
              <h5>
                <span>Instructions:</span>
                {Array.isArray(myRecipe.steps) ? (
                  myRecipe.steps.map((e, i) => {
                    return <p key={i}>{e}</p>;
                  })
                ) : (
                  <p>{myRecipe.steps}</p>
                )}
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
