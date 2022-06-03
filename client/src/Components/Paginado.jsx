import React from "react";
import styles from "./Styles/Paginado.module.css";
export default function Paginado({ recipesPerPage, AllRecipes, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(AllRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={styles.number} key={number}>
              <button className={styles.btn} onClick={() => paginado(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
