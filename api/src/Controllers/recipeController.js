const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY, CANT_RECIPE } = process.env;

const getRecipeFromDb = async () => {
  const infoRecipe = await Recipe.findAll();
  return infoRecipe;
};

const getApiAndDb = async () => {
  let DB = await getRecipeFromDb();
  const GetTotal = [...DB];
  return GetTotal;
};

module.exports = {
  getRecipeFromDb,
  getApiAndDb,
};
