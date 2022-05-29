import React from "react";

export default function Card({ image, title, diets, score }) {
  return (
    <div>
      <h3>{title}</h3>
      <h4>Puntuacion: {score}</h4>
      <h5>
        {
          <ul>
            {diets.map((e, i) => {
              return <li key={i}>{e.nameDiet}</li>;
            })}
          </ul>
        }
      </h5>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  );
}
