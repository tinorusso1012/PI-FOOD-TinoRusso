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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    },
    HealthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://previews.123rf.com/images/jenifoto/jenifoto2006/jenifoto200600100/150438480-marco-de-comida-de-barbacoa-de-verano-con-hot-dog-y-buffet-de-hamburguesas-sobre-un-fondo-de-madera-.jpg",
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    DB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    Diets: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    servings: {
      type: DataTypes.INTEGER,
    },
  });
};
