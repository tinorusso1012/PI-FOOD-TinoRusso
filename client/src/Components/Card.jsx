import React from "react";
import styles from "./Styles/Card.module.css";
export default function Card({ image, title, diets, score, servings }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="img not found" className={styles.img} />
      <div className={styles.cardText}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.ps}>Puntuacion: {score}</h4>
        <h4 className={styles.ps}>Servings:{servings}</h4>
        <div className={styles.dietsPs}>
          {
            <ul className={styles.ps}>
              Diets:
              {diets.map((e, i) => {
                return <li key={i}>{e}</li>;
              })}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}
