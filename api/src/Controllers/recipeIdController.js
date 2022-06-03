const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
const res = require("express/lib/response");
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
const GetInstructionGood = (steps) => {
  steps = steps.replaceAll("<li>", "");
  steps = steps.replaceAll("<span>", "");
  steps = steps.replaceAll("</span>", "");
  steps = steps.replaceAll("</li>", "");
  steps = steps.replaceAll("</ol>", "");
  steps = steps.replaceAll("<ol>", "");

  return steps;
};
const GetByID = async (id) => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=${CANT_RECIPE}&addRecipeInformation=true`
    );
    // const recipeInfo = [apiUrl];
    const e = apiUrl.data;
    return {
      id: e.id,
      title: e.title,
      spoonacularScore: GetSpoonacularScore(e.summary),
      summary: GetSummaryGood(e.summary),
      image: e.image,
      preparationTime: e.preparationMinutes,
      diets: e.diets.map((e) => {
        return { name: e };
      }),
      dishTypes: e.dishTypes.map((e) => {
        return { name: e };
      }),
      healtScore: e.healthScore,
      servings: e.servings,
      readyInMinutes: e.readyInMinutes,
      steps: GetInstructionGood(e.instructions),
    };

    //return info;
  } catch (error) {
    return undefined;
  }
};
const GetIdDb = async (id) => {
  try {
    const dbId = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return dbId;
  } catch (error) {
    return undefined;
  }
};

const getIdAll = async (id) => {
  const idApi = GetByID(id);
  const idDb = GetIdDb(id);
  const [Api, Db] = await Promise.all([idApi, idDb]);
  return Api || Db;
};

module.exports = {
  GetIdDb,
  GetByID,
  getIdAll,
};
