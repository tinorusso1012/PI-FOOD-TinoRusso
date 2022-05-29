import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostRecipe, getDiets } from "../Actions";
import { validate } from "./validation/validation1";
import "./Styles/RecipeCreate.css"
import check from "../images.png";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  let listOfDiets = useSelector((state) => state.diets);
  const [cantSteps, setCantSteps] = useState(1);
  const [errors, setErrors] = useState({
    title: "Username is required",
    summary: "summary is required",
    spoonacularScore: "Score is required",
    HealthScore: "HealthScore is required",
    image: "",
  });
  const [diet, setDiet] = useState([]);
  const [newDiet, setNewDiet] = useState("");
  const [Do, setDo] = useState(null);
  const [step, setStep] = useState([]);
  const [Finalstep, setFinalStep] = useState([]);
  const [DishTypes, setDishTypes] = useState("");
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: 0,
    HealthScore: 0,
    image: undefined,
    steps: [],
    DB: true,
    dishTypes: [],
    servings: 0,
    Diets: [],
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

  function handleCheckbox(e) {
    if (e.target.checked) {
      const arr = [e.target.value];
      return setDiet([...diet, ...arr]);
    }
    let arr2 = diet.filter((el) => el !== e.target.value);
    setDiet(arr2);
  }

  function handleStep(e) {
    e.preventDefault();
    setDo(true);
    let arr = [];
    for (let i = 0; i < cantSteps; i++) {
      arr.push(i + 1);
    }
    setStep(arr);
  }
  function handleStepInArray(e) {
    let arr = Finalstep;
    arr[e.target.name - 1] = e.target.value;
    setFinalStep(arr);
  }

  function handleNewDiet(e) {
    setNewDiet(e.target.value);
  }
  function handleDishType(e) {
    setDishTypes(e.target.value);
  }
  function setNewDietClick(e) {
    e.preventDefault();
    listOfDiets.push({ name: newDiet });
    setNewDiet("");
  }
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
    setInput((input.Diets = diet));
    setInput((input.Finalstep = step));
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
          Diets: [],
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Recipe Create Fail");
      });
  }

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu Receta!</h1>
      <form>
        <div className="DivForm">
          <label>Title // Titulo</label>
          <input
            className={errors.title ? "danger" : "green"}
            type="text"
            name="title"
            value={input.title}
            onChange={(e) => handleChange(e)}
          />
          {errors.title ? (
            <p className="danger">{errors.title}</p>
          ) : (
            <img
              src={check}
              className="imgCheck"
              alt="img not found"
              width="30px"
              height="25px"
            />
          )}
        </div>
        <div className="DivForm">
          <label>Summary // Resumen:</label>
          <input
            className={errors.summary ? "danger" : "green"}
            type="text"
            name="summary"
            value={input.summary}
            onChange={(e) => handleChange(e)}
          />
          {errors.summary ? (
            <p className="danger">{errors.summary}</p>
          ) : (
            <img
              src={check}
              className="imgCheck"
              alt="img not found"
              width="30px"
              height="25px"
            />
          )}
        </div>
        <div className="DivForm">
          <label>Image // Imagen:</label>
          <input
            className={errors.image ? "danger" : "green"}
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
          />
          {errors.image ? (
            <p className="danger">{errors.image}</p>
          ) : (
            <img
              src={check}
              className="imgCheck"
              alt="img not found"
              width="30px"
              height="25px"
            />
          )}
        </div>
        <h4> Diets // Dietas</h4>
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
        <input
          type="text"
          value={newDiet}
          placeholder="Ingrese Nueva Dieta"
          onChange={(e) => handleNewDiet(e)}
        ></input>
        <button onClick={(e) => setNewDietClick(e)}>Enviar Nueva Receta</button>
        <div className="DivForm">
          <label>Score // Puntuacion:</label>
          <input
            className={errors.spoonacularScore ? "danger" : "green"}
            type="number"
            name="spoonacularScore"
            onChange={(e) => handleChange(e)}
            value={input.spoonacularScore}
          />
          {errors.spoonacularScore ? (
            <p className="danger">{errors.spoonacularScore}</p>
          ) : (
            <img
              src={check}
              className="imgCheck"
              alt="img not found"
              width="30px"
              height="25px"
            />
          )}
        </div>
        <div className="DivForm">
          <label>HealtScore // Puntuacion de salud:</label>
          <input
            className={errors.HealthScore ? "danger" : "green"}
            type="number"
            name="HealthScore"
            value={input.HealthScore}
            onChange={(e) => handleChange(e)}
          />
          {errors.HealthScore ? (
            <p className="danger">{errors.HealthScore}</p>
          ) : (
            <img
              src={check}
              className="imgCheck"
              alt="img not found"
              width="30px"
              height="25px"
            />
          )}
        </div>
        <div>
          <label>Servings // Porciones:</label>
          <input
            type="number"
            name="servings"
            value={input.servings}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Dish Type // Tipo de Plato:</label>
          <input
            type="text"
            name="dishTypes"
            onChange={(e) => {
              handleDishType(e);
            }}
          />
        </div>
        <div>
          <label>Ingrese la cantidad de pasos:</label>
          <input
            type="number"
            name="cantSteps"
            value={cantSteps}
            onChange={(e) => {
              handlesetCantSteps(e);
            }}
          />
          <button
            onClick={(e) => {
              handleStep(e);
            }}
          >
            Enviar
          </button>
        </div>
        <div>
          {Do &&
            step.map((step, i) => (
              <div key={i}>
                <label> Step / Paso{step}: </label>
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
            onClick={(e) => {
              HandlePost(e);
            }}
          >
            Crear RECETA
          </button>
          {errors.PostError && <p className="danger">{errors.PostError}</p>}
        </div>
      </form>
    </div>
  );
}
