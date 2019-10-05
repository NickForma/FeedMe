var db = require("../models");

module.exports = function(app) {
  app.get("/api/calendar", function(req, res) {
    db.Recipe.findAll({
      where: {
        day: tues,
        time: lunch
      }
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  app.post("/api/id", function(req, res) {
    db.Recipe.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  // app.post("/api/id", function(req, res) {
  //   db.Recipe.create(req.body).then(function(result) {
  //     res.json(result);
  //   });
  // });

  app.get("/api/ingredients/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(
      ingredient
    ) {
      res.json(ingredient);
    });
  });

  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create(req.body)
      .then(user => {
        res.status(201).send(user);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  app.post("/api/login", (req, res) => {
    console.log(req.body);
    db.User.findOne({
      where: req.body
    })
      .then(user => {
        console.log(user);
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(400).send(err);
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
