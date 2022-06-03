const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY, CANT_RECIPE } = process.env;

const GetSpoonacularScore = (summary) => {
  let index = summary.indexOf("score of") + 9;
  let number = summary.substring(index, [index + 4]);
  let numberFinal = "";
  for (let i = 0; i < number.length; i++) {
    if (isNaN(number[i]) == false) {
      numberFinal = numberFinal + number[i];
    }
  }
  return Number(numberFinal);
};
const GetSummaryGood = (summary) => {
  summary = summary.replaceAll("<b>", "");
  summary = summary.replaceAll("</b>", "");
  summary = summary.replaceAll("<a>", "");
  summary = summary.replaceAll("</a>", "");
  summary = summary.replaceAll("<a", "");
  summary = summary.replaceAll(">", "");
  summary = summary.replaceAll("href=", "");

  return summary;
};
const getRecipe = async () => {
  const ApiResult = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${CANT_RECIPE}&addRecipeInformation=true`
  );
  const result = await ApiResult.data?.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: GetSummaryGood(e.summary),
      image: e.image,
      preparationTime: e.preparationMinutes,
      readyInMinutes: e.readyInMinutes,
      diets: e.diets.map((e) => {
        return { name: e };
      }),
      Instructions: e.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
      dishTypes: e.dishTypes.map((e) => {
        return { name: e };
      }),
      healtScore: e.healthScore,
      servings: e.servings,
      spoonacularScore: GetSpoonacularScore(e.summary),
    };
  });
  return result;
};

const getRecipeFromDb = async () => {
  const infoRecipe = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
    },
  });
  return infoRecipe;
};

const getApiAndDb = async () => {
  let API = await getRecipe();
  let DB = await getRecipeFromDb();
  const GetTotal = [...API, ...DB];
  return GetTotal;
};

module.exports = {
  getRecipe,
  getRecipeFromDb,
  getApiAndDb,
};
