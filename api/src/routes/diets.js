const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY, CANT_RECIPE } = process.env;

router.get("/", async (req, res) => {
  try {
    const info = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${CANT_RECIPE}&addRecipeInformation=true`
    );
    const diets = info.data?.results.map((e) => e.diets);
    const flatDiets = diets.flat();
    const finalList = [...new Set(flatDiets)];
    console.log(finalList);

    finalList.forEach((e) => {
      Diet.findOrCreate({
        where: { name: e },
      });
    });
    const allDiets = await Diet.findAll();
    res.status(200).send(allDiets);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
