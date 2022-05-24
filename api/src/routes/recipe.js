const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
const {
  getRecipe,
  getRecipeFromDb,
  getApiAndDb,
} = require("../Controllers/recipeController");
const { GetByID, GetIdDb } = require("../Controllers/recipeIdController");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const APITOTAL = await getApiAndDb();
    if (name) {
      const recipeName = APITOTAL.filter((element) =>
        element.title.toLowerCase().includes(name.toString().toLowerCase())
      );
      console.log(recipeName);
      if (recipeName.length) {
        return res.status(200).send(recipeName);
      } else {
        return res.status(404).send("Recipe not Found");
      }
    } else {
      return res.status(200).send(APITOTAL);
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

router.get("/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const dbId = await GetIdDb(idRecipe);
    if (dbId) {
      res.json(dbId);
    } else {
      const IdApi = await GetByID(idRecipe);
      if (IdApi) {
        res.json(IdApi);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/recipe", async (req, res) => {
  let {
    tittle,
    summary,
    spoonacularScore,
    HealthScore,
    steps,
    Image,
    MadeOnDb,
    diets,
  } = req.body;
  try {
    let newRecipe = await Recipe.create({
      tittle,
      summary,
      spoonacularScore,
      HealthScore,
      steps,
      Image,
      MadeOnDb,
    });
    let dietsdb = await Diet.findOne({
      where: { name: diets },
    });
    newRecipe.addDiet(dietsdb);
    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});
module.exports = router;
