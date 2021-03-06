const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
const { getApiAndDb } = require("../Controllers/recipeController");
const { getIdAll } = require("../Controllers/recipeIdController");

router.get("/", async (req, res) => {
  const { name } = req.query;
  const APITOTAL = await getApiAndDb();
  console.log(APITOTAL);
  if (name) {
    const recipeName = APITOTAL.filter((element) =>
      element.title.toLowerCase().includes(name.toString().toLowerCase())
    );
    if (recipeName.length) {
      return res.status(200).send(recipeName);
    } else {
      return res.status(404).send("Recipe not Found");
    }
  } else {
    return res.status(200).send(APITOTAL);
  }
});

router.get("/:idRecipe", async (req, res, next) => {
  try {
    const id = req.params.idRecipe;
    const recipeDetail = await getIdAll(id);
    if (!recipeDetail) {
      return res.status(404).json("No recipe under that id");
    }
    res.status(200).json(recipeDetail);
  } catch (error) {
    next(error);
  }
});

router.post("/recipe", async (req, res) => {
  let {
    title,
    summary,
    spoonacularScore,
    HealthScore,
    image,
    steps,
    readyInMinutes,
    DB,
    dishTypes,
    servings,
    diets,
  } = req.body;
  try {
    let LastRecipe = await Recipe.findAll();
    LastRecipe = LastRecipe.pop();
    const id = LastRecipe.id + 1;
    console.log("ACAMIREY", id, LastRecipe);
    let newRecipe = await Recipe.create({
      id,
      title,
      summary,
      spoonacularScore,
      HealthScore,
      image,
      readyInMinutes,
      steps,
      DB,
      dishTypes,
      servings,
      diets,
    });
    for (let i = 0; i < diets.length; i++) {
      let dietsdb = await Diet.findOne({
        where: { name: diets[i] },
      });
      if (!dietsdb) {
        await Diet.create({ name: diets[i] });
      }
    }
    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
