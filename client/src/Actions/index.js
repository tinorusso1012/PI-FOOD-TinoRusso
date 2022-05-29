import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_TYPE = "GET_TYPE";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_BY_CREATE = "FILTER_BY_CREATE";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_SCORE = "FILTER_BY_SCORE";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const POST_RECIPE = "POST_RECIPE";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_DETAILRESET = "GET_DETAILRESET";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: json.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/type");
    return dispatch({
      type: GET_TYPE,
      payload: json.data,
    });
  };
}

export function GetRecipeByName(title) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/recipes?name=${title}`);
      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function GetRecipeById(id) {
  return async function (dispatch) {
    try {
      var DataById = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_RECIPE_BY_ID,
        payload: DataById.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getDetailsreset() {
  return { type: GET_DETAILRESET };
}

export function PostRecipe(info) {
  return async function (dispatch) {
    try {
      const data = await axios.post("http://localhost:3001/recipes/recipe", info);
      console.log(data);
      return {
        type: POST_RECIPE,
        payload: data,
      };
    } catch (err) {
      console.log(err);
    }
  };
}

export function FilterRecipesByDiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}

export function FilterByCreate(payload) {
  return {
    type: FILTER_BY_CREATE,
    payload,
  };
}

export function FilterByName(payload) {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
}

export function FilterByScore(payload) {
  return {
    type: FILTER_BY_SCORE,
    payload,
  };
}
