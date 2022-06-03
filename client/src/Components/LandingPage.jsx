import React from "react";
import { Link } from "react-router-dom";
import styles from "./Styles/LandingPage.module.css";
import hamburgesa from "../Imagenes/Hamburgesa.gif";
import pizza from "../Imagenes/PizzaLoading.gif";
import { useState } from "react";

function LandingPage() {
  const [Select, setSelect] = useState("ES");
  const HandleLanguage = (e) => {
    e.preventDefault();
    setSelect(e.target.value);
  };
  return (
    <div className={styles.background}>
      <div className={styles.DivPrincipal}>
        <select
          onChange={(e) => {
            HandleLanguage(e);
          }}
          className={styles.selectLenguaje}
        >
          <option value="ES">ES</option>
          <option value="EN">EN</option>
        </select>
        <div className={styles.contText}>
          {console.log(Select)}
          {Select === "ES" ? (
            <h1>Comer es una necesidad,</h1>
          ) : (
            <h1>Eating is necessary,</h1>
          )}
          {Select === "ES" ? (
            <h1>pero comer con</h1>
          ) : (
            <h1>but eat intelligently</h1>
          )}
          {Select === "ES" ? (
            <h1>inteligencia, es un arte.</h1>
          ) : (
            <h1>is an art</h1>
          )}
        </div>
        <Link to="/home">
          {Select === "ES" ? (
            <button className={styles.btn}> Ingresar</button>
          ) : (
            <button className={styles.btn}> Get Into</button>
          )}
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
