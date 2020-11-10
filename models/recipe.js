module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
      name: DataTypes.STRING,
      ingredient: DataTypes.STRING,
      category: DataTypes.STRING,
      content: DataTypes.TEXT,
    
      });
    return Recipe;
  };