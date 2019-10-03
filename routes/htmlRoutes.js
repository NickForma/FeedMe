var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "FEED ME",
        examples: dbExamples
      });
    });
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
