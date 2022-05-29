import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetRecipeById, getDetailsreset } from "../Actions/index";
import { useEffect } from "react";
export default function Detail(prop) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetRecipeById(prop.match.params.id));
    dispatch(getDetailsreset());
  }, [dispatch]);
  const myRecipe = useSelector((state) => state.detail);
  return (
    <div>
      <h1>{myRecipe.title}</h1>
      {/* // width="200px" height="250px" */}
      {console.log(myRecipe)}
    </div>
  );
}
