const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
const {
  getRecipe,
  getRecipeFromDb,
  getApiAndDb,
} = require("../Controllers/recipeController");
const { getIdAll } = require("../Controllers/recipeIdController");

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
    DB,
    dishTypes,
    servings,
    Diets,
  } = req.body;
  try {
    const DietsOriginal = Diets;
    Diets = Diets.map((e) => {
      return { nameDiet: e };
    });
    let newRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      HealthScore,
      image,
      steps,
      DB,
      dishTypes,
      servings,
      Diets,
    });
    let dietsdb = await Diet.findOne({
      where: { name: DietsOriginal },
    });
    newRecipe.addDiet(dietsdb);
    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
