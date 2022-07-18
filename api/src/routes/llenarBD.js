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
const GetInstructionGood = (steps) => {
  steps = steps.replaceAll("<li>", "");
  steps = steps.replaceAll("<span>", "");
  steps = steps.replaceAll("</span>", "");
  steps = steps.replaceAll("</li>", "");
  steps = steps.replaceAll("</ol>", "");
  steps = steps.replaceAll("<ol>", "");

  return steps;
};
router.post("/llenarDB", async (req, res) => {
  try {
    const ApiResult = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${CANT_RECIPE}&addRecipeInformation=true`
    );
    const diets = ApiResult.data?.results.map((e) => e.diets);
    const flatDiets = diets.flat();
    const finalList = [...new Set(flatDiets)];

    finalList.forEach(async (e) => {
      await Diet.findOrCreate({
        where: { name: e },
      });
    });

    const result = await ApiResult.data?.results.map((e) => {
      return {
        id: e.id,
        DB: false,
        title: e.title,
        summary: GetSummaryGood(e.summary),
        image: e.image,
        preparationTime: e.preparationMinutes,
        readyInMinutes: e.readyInMinutes,
        diets: e.diets.map((x) => {
          return x;
        }),
        steps: e.analyzedInstructions[0]?.steps.map((e) => {
          return e.step;
        }),
        dishTypes: e.dishTypes.map((e) => {
          return e;
        }),
        healtScore: e.healthScore,
        servings: e.servings,
        spoonacularScore: GetSpoonacularScore(e.summary),
        diets: e.diets,
      };
    });
    console.log(result[0]);
    for (let i = 0; i < result.length; i++) {
      await Recipe.create(result[i]);
    }
    return res.send("Base llena satisfactoriamente :D");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
