const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { API_KEY, CANT_RECIPE } = process.env;

router.get("/", async (req, res) => {
  try {
    const allDiets = await Diet.findAll();
    res.status(200).send(allDiets);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
