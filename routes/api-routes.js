// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
    app.get("/recipes", function(req, res) {
        db.Recipe.findAll({}).then(function(result) {
        res.json(result);
        });
    });

  // Get route for returning posts of a specific category where the category is equal to req.params.category,
//   app.get("/api/posts/category/:category", function(req, res) {
//     db.Post.findAll ({
//         where: {
//             category: req.params.category,
//         } 
//     }).then(function (result){
//         res.json(result);
//     });

//   });

  // Get route for retrieving a single recipe where the id is equal to req.params.id.
  app.get("/recipes/:id", function(req, res) {
    db.Recipes.findOne ({
        where: {
            id: req.params.id,
        } 
    }).then(function (result){
        res.json(result);
    });
     
  });

  // POST route for saving a new recipe post using req.body,
  app.post("/recipes", function(req, res) {
     db.Recipe.create ({
        name: req.body.name,
        ingredient: req.body.ingredient,
        category: req.body.category,
        content: req.body.content
           
    }).then(function (result){
        res.json(result);
    })
  });

  // DELETE route for deleting recipe post where the id is equal to req.params.id,
  app.delete("/recipes/:id", function(req, res) {
     db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // PUT route for updating recipe posts using the values in req.body, where the id is equal to req.body.id
  app.put("/recipes", function(req, res) {
    db.Recipe.update({
        name: req.body.name,
        ingredient: req.body.ingredient,
        category: req.body.category,
        content: req.body.content
      
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(result) {
      res.json(result);
    });

  });

};