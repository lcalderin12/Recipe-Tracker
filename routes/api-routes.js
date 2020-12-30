// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *******************************************************************************

var nodemailer = require("nodemailer");
var db = require("../models");
var passport = require("../config/passport");

// Routes

module.exports = function (app) {


  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("login");
  });


  // GET route for getting all of the posts and return them to the user with res.json
  app.get("/api/all", function (req, res) {
    db.Recipe.findAll({ order: [["updatedAt", "DESC"]] }).then(function (result) {
      res.json(result);
    });
  });

  // Get route for retrieving a single recipe where by name
  app.get("/api/recipes/:name", function (req, res) {
    db.Recipe.findAll({
      where: {
        name: req.params.name
      }
    }).then(function (result) {
      res.json(result);
    });
  });

  // Get route for retrieving a single recipe where by name
  app.get("/api/recipes/ingredients/:ingredients", function (req, res) {
    db.Recipe.findAll({
      where: {
        ingredients: req.params.ingredients
      }
    }).then(function (result) {
      res.json(result);
    });
  });


  // Get route for retrieving a single recipe where by category
  app.get("/api/recipes/category/:category", function (req, res) {
    db.Recipe.findAll({
      where: {
        category: req.params.category
      }
    }).then(function (result) {
      res.json(result);
    });
  });


  // POST route for saving a new recipe for creating a recipe using req.content
  app.post("/api/new", function (req, res) {
    console.log(req.body);
    db.Recipe.create(req.body).then(function (result) {
      res.json(result);
    });
  });
  //req.body and result hold EmailObject instead of data from the form submitted
  app.post("/api/contact", function (req, res) {
    let rock = {};
    //adding contact form data to EmailObjects table in Jawsdb recipe db
    db.EmailObject.create(req.body).then(function (result) {
      res.json(result);
      rock = req.body;
      console.log(`BUT FIRST: ${req.body.name} `);
      return rock;
    }).then(function (rock) {
      console.log(`AND U KNOW THIS! : ${rock.contactInfo} CHECK THIS: ${rock.name}`);
      return rock;
    });

    async function main() {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `'Recipe Track App' <${process.env.MAIL_USER}>`, // sender address
        to: `'Contacts' <${process.env.MAIL_USER}>`, // list of receivers
        subject: req.body.category, // Subject line
        text: req.body.content, // plain text body
        html: `<p>Contact Name: <b>${req.body.name}</b></p></br>
              <p>Contact Info: <b>${req.body.contactInfo}</b></p></br>
              <p>Category: ${req.body.category}</p></br>
              <p>Message: ${req.body.content}</p>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
  });


  app.put("/recipes/:id", function (req, res) {
    console.log(req.body);
    console.log(req.params.id);
    db.Recipe.update({
      name: req.body.name,
      ingredients: req.body.ingredients,
      category: req.body.category,
      content: req.body.content

    }, {
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });
  });

  // DELETE route for deleting recipes where the id is equal to req.params.id,
  app.delete("/api/all/:id", function (req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });
  });



};
