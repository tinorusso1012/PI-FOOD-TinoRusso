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
const GetIdDb = async (id) => {
  try {
    const dbId = await Recipe.findByPk(id);

    return dbId;
  } catch (error) {
    return undefined;
  }
};

const getIdAll = async (id) => {
  const idDb = await GetIdDb(id);
  return idDb;
};

module.exports = {
  GetIdDb,
  getIdAll,
};
