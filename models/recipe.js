module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    title: DataTypes.STRING,
    day: DataTypes.STRING,
    time: DataTypes.STRING
  });
  return Recipe;
};
