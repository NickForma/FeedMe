var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

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
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "FEED ME",
        examples: dbExamples
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
  // app.get("/mealPlan", function(req, res) {
  //   res.render("mealPlan");
  // });

  // app.get("/ingredients/:id", function(req, res) {
  //   db.Recipe.findOne({ where: { id: req.params.id } }).then(function() {
  //     res.render("ingredients");
  //   });
  // });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/groceryList", function(req, res) {
    res.render("groceryList");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
