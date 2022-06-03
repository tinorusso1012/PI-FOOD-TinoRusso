import {
  GET_RECIPES,
  GET_TYPE,
  FILTER_BY_DIETS,
  FILTER_BY_CREATE,
  FILTER_BY_NAME,
  FILTER_BY_SCORE,
  GET_RECIPE_BY_NAME,
  GET_RECIPE_BY_ID,
  POST_RECIPE,
  GET_DETAILRESET,
} from "../Actions/index";
const initialState = {
  recipes: [],
  AllRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        AllRecipes: action.payload,
      };
    case GET_TYPE:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_RECIPE_BY_ID:
      return { ...state, detail: action.payload };
    case GET_DETAILRESET:
      let reset = [];
      return {
        ...state,
        detail: reset,
      };
    case FILTER_BY_DIETS:
      const allRecipes = state.AllRecipes;
      const DietsFiltered =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((e) =>
              e.diets.find((j) => j.name === action.payload.toLowerCase())
            );
      console.log(allRecipes);
      console.log(DietsFiltered);
      console.log(action.payload);

      return {
        ...state,
        recipes: DietsFiltered,
      };
    case FILTER_BY_CREATE:
      const allRecipe = state.AllRecipes;
      const createdFilter =
        action.payload === "created"
          ? allRecipe.filter((e) => e.DB)
          : allRecipe.filter((e) => !e.DB);
      return {
        ...state,
        recipes: action.payload === "All" ? state.AllRecipes : createdFilter,
      };
    case FILTER_BY_NAME:
      let ArrSortName =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: ArrSortName,
      };

    case FILTER_BY_SCORE:
      let ArrSortScore =
        action.payload === "desc"
          ? state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) {
                return 1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) {
                return -1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: ArrSortScore,
      };

    default:
      return state;
  }
}
export default rootReducer;
