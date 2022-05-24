import React from "react";

export default function Card({ image, title, diets, id}) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>
        {
          <ul>
            {diets.map((e) => {
              return <li key={id}>{e.nameDiet}</li>;
            })}
          </ul>
        }
      </h5>
      <img src={image} alt="img not found" width="200px" height="250px" />
    </div>
  );
}
