var express = require("express");
var PORT = process.env.PORT || 3030;
var app = express();

// Serve static content for the app from the "views" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SETUP HANDLEBARS
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/html-routes")(app);

// app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});