const { DatabaseError } = require("pg/lib");
const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: true,
    },
    HealthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue:
        "https://previews.123rf.com/images/jenifoto/jenifoto2006/jenifoto200600100/150438480-marco-de-comida-de-barbacoa-de-verano-con-hot-dog-y-buffet-de-hamburguesas-sobre-un-fondo-de-madera-.jpg",
    },

    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    DB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    diets: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
  });
};
