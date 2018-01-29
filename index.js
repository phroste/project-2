// //imports express, bodyParser(returns middleware that only parses json), morgan(our logger), & mustacheExpress(the mustache templating engine) from node modules
// const express = require("express");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const mustacheExpress = require("mustache-express");

// //hook up movies router
// const moviesRouter = require("./controllers/movies.js");

// const app = express();
// const PORT = process.env.PORT || 3000;

// //connect the mustache templating engine with express
// app.engine("html", mustacheExpress());
// //declare a views and public directories to be accessible from our app
// app.set("view engine", "html");
// app.set("views", __dirname + "/views");
// app.use(express.static(__dirname + "/public"));

// //link morgan and bodyParser middleware to get logging and so we can parse request body data
// app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.render("main");
// });

// //attach the movies router to the app
// app.use("/movies", moviesRouter);

// //kick off the server by listening to the port declared on line 8
// app.listen(PORT, () => {
//   console.log("Server started on " + PORT);
// });

// require necessary top-level modules
const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");

// other consts
const port = 3000;
const app = express(); // <- the app object

// ------------------------------------------------------------
// Hook up body-parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// ------------------------------------------------------------
// Hook up mustache-express

// registers the template engine for use in res.render
app.engine("html", mustacheExpress());
// sets the file extension to use for views when the file extension is omitted
app.set("view engine", "html");
// sets the the directory that will contain our mustache template files, or "views"
app.set("views", __dirname + "/views");
// sets the directory that will contain our static (not generated on the fly) resources, such as css, client-side Javascript files, and images
app.use(express.static(__dirname + "/public"));

// ------------------------------------------------------------
// Hook up top-level routes

// get the trains router (the export of the trains controller file)
const moviesRouter = require("./controllers/movies.js");
// app.get("/", (req, res) => {
//   res.render("main");
// });
// hook it up to the app
app.use("/movies", moviesRouter);

// ------------------------------------------------------------
// Start listening!
app.listen(port, () => {
  console.log("Server started on " + port);
});

//error handling middleware
app.use((err, req, res, next) => {
  console.log("Error encountered:", err);
  res.status(500);
  res.send(err);
});
