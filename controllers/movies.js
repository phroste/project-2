const router = require("express").Router();
const Movies = require("../models/movies.js");

router.get(
  "/",
  Movies.allMovies,
  Movies.allMovies2,
  Movies.allMovies3,
  Movies.allMovies4,
  Movies.allMovies5,
  (req, res, next) => {
    console.log("hitting movies/");
    // res.send("this 'movies' route works");
    // res.render("main", { allMoviesData: res.locals.allMoviesData });
    // don't need to set res.locals to an object if only displaying 1 thing
    // res.render("movies", res.locals.allMoviesData);
    res.render("movies", {
      allMoviesData: res.locals.allMoviesData,
      allMoviesData2: res.locals.allMoviesData2,
      allMoviesData3: res.locals.allMoviesData3,
      allMoviesData4: res.locals.allMoviesData4,
      allMoviesData5: res.locals.allMoviesData5
    });
  }
);

router.get("/new", (req, res, next) => {
  // res.send("this 'movies/new' route works");
  res.render("new");
});

// router.get("/");

module.exports = router;
