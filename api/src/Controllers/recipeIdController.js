const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();
const axios = require("axios");
const res = require("express/lib/response");
require("dotenv").config();
const { API_KEY, CANT_RECIPE } = process.env;

// const GetByID = async (id) => {
//   try {
//     let IdFound = Recipe.findByPk(id, {
//       include: {
//         models: Diet,
//       },
//     });
//     if (IdFound.length) {
//       return res.json(IdFound);
//     }
//     const apiID = await axios.get(
//       `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=${CANT_RECIPE}&addRecipeInformation=true`
//     );
//     const e = await apiID.data;
// return {
//   id: e.id,
//   title: e.title,
//   summary: e.summary,
//   image: e.image,
//   preparationTime: e.preparationMinutes,
//   diets: e.diets.map((e) => {
//     return { nameDiet: e };
//   }),
//   Instructions: e.analyzedInstructions[0]?.steps.map((e) => {
//     return e.step;
//   }),
//   dishTypes: e.dishTypes.map((e) => {
//     return { name: e };
//   }),
//   healtScore: e.healthScore,
//   servings: e.servings,
//   readyInMinutes: e.readyInMinutes,
// };
//   } catch (err) {
//     console.log(err);
//     res.send("Hubo un error al traer la informacion");
//   }
// };

// const GetIdDb = async (id) => {
//   try {
//     const dbid = await Recipe.findByPk(id, {
//       include: {
//         models: Diet,
//       },
//     });
//     return dbid;
//   } catch (err) {
//     console.log(err);
//   }
// };

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
      summary: e.summary,
      image: e.image,
      preparationTime: e.preparationMinutes,
      diets: e.diets.map((e) => {
        return { nameDiet: e };
      }),
      Instructions: e.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
      dishTypes: e.dishTypes.map((e) => {
        return { name: e };
      }),
      healtScore: e.healthScore,
      servings: e.servings,
      readyInMinutes: e.readyInMinutes,
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
