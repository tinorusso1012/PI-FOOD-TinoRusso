import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostRecipe, getDiets } from "../Actions";
import { validate } from "./validation/validation1";
import { validateArray } from "./validation/validation2";

import styles from "./Styles/RecipeCreate.module.css";
import check from "../images.png";
import rataCocinando from "../Imagenes/RataImg.jpeg";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  let listOfDiets = useSelector((state) => state.diets);
  const [cantSteps, setCantSteps] = useState(1);
  // Errores
  const [errors, setErrors] = useState({
    title: " ",
    summary: " ",
    spoonacularScore: " ",
    HealthScore: " ",
    image: " ",
    readyInMinutes: " ",
    servings: " ",
  });
  // Errores Dietas
  const [errorsArr, setErrorsArr] = useState({
    diets: "",
  });
  const [diet, setDiet] = useState([]);
  const [newDiet, setNewDiet] = useState("");
  const [Do, setDo] = useState(null);
  const [step, setStep] = useState([]);
  const [Finalstep, setFinalStep] = useState([]);
  const [DishTypes, setDishTypes] = useState("");
  // Estados Que se mandan al Post
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    HealthScore: "",
    readyInMinutes: "",
    image: undefined,
    steps: [],
    DB: true,
    dishTypes: [],
    servings: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // Funcion Para Ingresar Cantidad de Pasos
  function handlesetCantSteps(e) {
    setCantSteps(e.target.value);
  }
  // Funcion para setear Values (sin Array)
  function handleChange(e) {
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
// Funcion para setear el array de las checkbox
  function handleCheckbox(e) {
    if (e.target.checked) {
      const arr = [e.target.value];
      return setDiet([...diet, ...arr]);
    }
    let arr2 = diet.filter((el) => el !== e.target.value);
    setDiet(arr2);
  }
// Funcion para llenar el  array de la cantidad de pasos
  function handleStep(e) {
    e.preventDefault();
    setDo(true);
    let arr = [];
    for (let i = 0; i < cantSteps; i++) {
      arr.push(i + 1);
    }
    setStep(arr);
  }
  // Funcion para setear la cantidad de pasos
  function handleStepInArray(e) {
    let arr = Finalstep;
    arr[e.target.name - 1] = e.target.value;
    setFinalStep(arr);
  }
//Funcion para setear DishType ( en String )
  function handleDishType(e) {
    setDishTypes(e.target.value);
  }
  // Funcion para setear una nueva dieta
  function handleNewDiet(e) {
    setErrorsArr(validateArray(e.target.value, listOfDiets));

    setNewDiet(e.target.value);
  }
  // Funcion para setear una nueva dieta ( Click)
  function setNewDietClick(e) {
    e.preventDefault();
    if (!errorsArr.diets) {
      listOfDiets.push({ name: newDiet });
      setNewDiet("");
    } else {
    }
  }

  // Funcion para finalmente Postear
  function HandlePost(e) {
    e.preventDefault();
    if (
      errors.title ||
      errors.spoonacularScore ||
      errors.summary ||
      errors.HealthScore ||
      errors.image
    ) {
      return setErrors({
        ...errors,
        PostError: "Faltan Llenar Formularios Obligatorios o corregirlos",
      });
    }
    setInput((input.diets = diet));
    setInput((input.steps = Finalstep));
    let arr = DishTypes;
    arr = arr.split(",");
    arr = arr.map((e) => {
      return { name: e };
    });
    setInput((input.dishTypes = arr));

    dispatch(PostRecipe(input))
      .then(() => {
        alert("Recipe Created");
        setInput({
          title: "",
          summary: "",
          spoonacularScore: 0,
          HealthScore: 0,
          image: undefined,
          steps: [],
          DB: true,
          dishTypes: [],
          servings: 0,
          diets: [],
        });
        setDiet([]);
      })
      .catch((err) => {
        console.log(err);
        alert("Recipe Create Fail");
      });
  }

  return (
    <div className={styles.background}>
      {/* Contenedor navBar */}
      <div className={styles.contNavBarPadre}>
        <Link to="/home">
          <img src={rataCocinando} alt="img not found" className={styles.img} />
        </Link>
        <Link to="/" className={styles.navRec}>
          Recipers
        </Link>
        <Link to="/home">
          {" "}
          <button className={styles.button}>Home</button>
        </Link>
      </div>
      <div className={styles.DivPadre}>
        <h1 className={styles.title}>Make your Recipe!</h1>
        <form>
          <div className={styles.DivFormPadre}>
            <div className={styles.FormTitle}>
              <label className={styles.TitleForm}>Title: </label>
              <input
                className={errors.title ? styles.danger : styles.green}
                type="text"
                name="title"
                value={input.title}
                onChange={(e) => handleChange(e)}
              />
              {errors.title ? (
                <p className={styles.danger}>{errors.title}</p>
              ) : (
                <img
                  src={check}
                  className={styles.imgCheck}
                  alt="img not found"
                  width="30px"
                  height="25px"
                />
              )}
            </div>
            <div className={styles.FormTitle}>
              <label>Summary:</label>
              <input
                className={errors.summary ? styles.danger : styles.green}
                type="text"
                name="summary"
                value={input.summary}
                onChange={(e) => handleChange(e)}
              />
              {errors.summary ? (
                <p className={styles.danger}>{errors.summary}</p>
              ) : (
                <img
                  src={check}
                  className={styles.imgCheck}
                  alt="img not found"
                  width="30px"
                  height="25px"
                />
              )}
            </div>
            <div className={styles.FormTitle}>
              <label>Image:</label>
              <input
                className={errors.image && styles.danger}
                type="text"
                name="image"
                value={input.image}
                onChange={(e) => handleChange(e)}
              />
              {errors.image ? (
                <p className={styles.danger}>{errors.image}</p>
              ) : (
                <img
                  src={check}
                  className={styles.imgCheck}
                  alt="img not found"
                  width="30px"
                  height="25px"
                />
              )}
            </div>
            <h4> diets:</h4>
            <div>
              {listOfDiets &&
                listOfDiets.map((e, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      name={e.name}
                      value={e.name}
                      onChange={(e) => handleCheckbox(e)}
                    />
                    {e.name}
                  </label>
                ))}
            </div>
            <div className={styles.FormTitle}>
              <input
                type="text"
                value={newDiet}
                placeholder="Enter new diet..."
                onChange={(e) => handleNewDiet(e)}
              ></input>
              <button
                className={styles.button3}
                disabled={!newDiet}
                onClick={(e) => setNewDietClick(e)}
              >
                Create new Diet
              </button>
              {errorsArr.diets && (
                <p className={styles.danger}>{errorsArr.diets}</p>
              )}
            </div>
            <div className={styles.FormTitle}>
              <label>Score of Recipe:</label>
              <input
                className={
                  errors.spoonacularScore ? styles.danger : styles.green
                }
                type="number"
                min="0"
                name="spoonacularScore"
                onChange={(e) => handleChange(e)}
                value={input.spoonacularScore}
              />
              {errors.spoonacularScore ? (
                <p className={styles.danger}>{errors.spoonacularScore}</p>
              ) : (
                <img
                  src={check}
                  className={styles.imgCheck}
                  alt="img not found"
                  width="30px"
                  height="25px"
                />
              )}
            </div>
            <div className={styles.FormTitle}>
              <label>Ready in Minutes:</label>
              <input
                className={errors.readyInMinutes ? styles.danger : styles.green}
                type="number"
                min="0"
                name="readyInMinutes"
                onChange={(e) => handleChange(e)}
                value={input.readyInMinutes}
              />
              {errors.readyInMinutes ? (
                <p className={styles.danger}>{errors.readyInMinutes}</p>
              ) : (
                <img
                  src={check}
                  className={styles.imgCheck}
                  alt="img not found"
                  width="30px"
                  height="25px"
                />
              )}
            </div>
            <div className={styles.FormTitle}>
              <label>HealtScore:</label>
              <input
                className={errors.HealthScore ? styles.danger : styles.green}
                type="number"
                min="0"
                name="HealthScore"
                value={input.HealthScore}
                onChange={(e) => handleChange(e)}
              />
              {errors.HealthScore ? (
                <p className={styles.danger}>{errors.HealthScore}</p>
              ) : (
                <img
                  src={check}
                  className={styles.imgCheck}
                  alt="img not found"
                  width="30px"
                  height="25px"
                />
              )}
            </div>
            <div className={styles.FormTitle}>
              <label>Servings:</label>
              <input
                className={errors.servings ? styles.danger : styles.green}
                type="number"
                min="0"
                name="servings"
                value={input.servings}
                onChange={(e) => handleChange(e)}
              />
              {errors.servings ? (
                <p className={styles.danger}>{errors.servings}</p>
              ) : (
                <img
                  src={check}
                  className={styles.imgCheck}
                  alt="img not found"
                  width="30px"
                  height="25px"
                />
              )}
            </div>
            <div className={styles.FormTitle}>
              <label>Dish Type :</label>
              <input
                type="text"
                name="dishTypes"
                onChange={(e) => {
                  handleDishType(e);
                }}
              />
            </div>
            <div className={styles.NumberOfSteps}>
              <label>Number of steps your recipe will have:</label>
              <input
                type="number"
                name="cantSteps"
                value={cantSteps}
                onChange={(e) => {
                  handlesetCantSteps(e);
                }}
              />
              <button
                className={styles.button2}
                onClick={(e) => {
                  handleStep(e);
                }}
              >
                Send number of steps
              </button>
            </div>
            <div>
              {Do &&
                step.map((step, i) => (
                  <div key={i} className={styles.steps}>
                    <label> Step {step}: </label>
                    <input
                      type="text"
                      name={step}
                      onChange={(e) => {
                        handleStepInArray(e);
                      }}
                    />
                  </div>
                ))}
            </div>
            <div className="DivForm">
              <button
                className={styles.button2}
                onClick={(e) => {
                  HandlePost(e);
                }}
              >
                Create Recipe
              </button>
              {errors.PostError && (
                <p className={styles.danger}>{errors.PostError}</p>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* cardS */}
      <div>{/* div vacio */}</div>
      <div className={styles.card}>
        <h3>Example of Card:</h3>
        {input.image ? (
          <img
            src={input.image}
            alt="img not valid.."
            className={styles.imgCard}
          />
        ) : (
          <img
            src="https://previews.123rf.com/images/jenifoto/jenifoto2006/jenifoto200600100/150438480-marco-de-comida-de-barbacoa-de-verano-con-hot-dog-y-buffet-de-hamburguesas-sobre-un-fondo-de-madera-.jpg"
            className={styles.imgDefault}
            alt="img not valid"
          />
        )}
        <div className={styles.cardText}>
          <h3 className={styles.titleCards}>{input.title}</h3>
          <h4 className={styles.ps}>Puntuacion: {input.score}</h4>
          <h4 className={styles.ps}>Servings:{input.servings}</h4>
          <div className={styles.dietsPs}>
            {
              <ul className={styles.ps}>
                Diets:
                {diet.map((e, i) => {
                  return <li key={i}>{e}</li>;
                })}
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
