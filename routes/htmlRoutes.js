var db = require("../models");

module.exports = function(app) {

  app.get("/mealPlan", function(req, res) {
    res.render("mealPlan");
  });

  app.get("/ingredients/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(recipe) {
      console.log(recipe.dataValues.recipeID);
      res.render("ingredients", {
        recipe: recipe
      });
    });
  });

  app.get("/grocerylist", function(req, res) {
    res.render("ingredients");
  });

  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function() {
      res.render("index", {
        msg: "FEED ME"
      });
    });
  });

  app.get("/calendar", function(req, res) {
    db.Recipe.findAll({}).then(function(feedMeDb) {
      res.render("calendar", {
        monD: feedMeDb
      });
    });
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("login");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Load example page and pass in an example by id
  app.get("/groceryList", function(req, res) {
    res.render("groceryList");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
