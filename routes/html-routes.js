// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var path = require("path");

// Routes

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view/index.handlebars
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/all", function(req, res) {
    res.render("all");
  });

  app.get("/add", function(req, res) {
    res.render("add");
  });

};
