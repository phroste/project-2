const router = require("express").Router();
const Movies = require("../models/movies.js");
// const movieModel = require("../models/movieseed.js");
const movie = require("../models/movie-seed.js");

router.get(
  "/",
  Movies.allMovies,
  Movies.allMovies2,
  Movies.allMovies3,
  Movies.allMovies4,
  Movies.allMovies5,
  (req, res, next) => {
    console.log("hitting movies/");
    // res.send("this 'index' route works");
    // res.render("main", { allMoviesData: res.locals.allMoviesData });
    // don't need to set res.locals to an object if only displaying 1 thing
    // res.render("index", res.locals.allMoviesData);
    res.render("movies", {
      allMoviesData: res.locals.allMoviesData,
      allMoviesData2: res.locals.allMoviesData2,
      allMoviesData3: res.locals.allMoviesData3,
      allMoviesData4: res.locals.allMoviesData4,
      allMoviesData5: res.locals.allMoviesData5
    });
  }
);

router.get("/search", (req, res, next) => {
  // res.send("this 'movies/search' route works");
  res.render("search");
});

//get request sent from the server to client. page for each individual movie request
router.get("/:newId", (req, res, next) => {
  // res.send("/:newId route works");
  res.render("movie-new");
});

router.post("/movie-new", movie.create, (req, res) => {
  res.redirect("/movies");
});
// router.post("/movie-new", movie.create, (req, res, next) => {
//   res.json({ id: res.locals.newMovieId, body: req.body });
// });

//post request
// router.post("/", (req, res, next) => {
//   res.json({ id: res.locals.newMovieId, body: req.body });
// });

//edit request
//'movies/1/edit'
router.get("/:newId/edit", (req, res, next) => {
  //   // res.render("edit-movie", res.locals.movieData);
  res.render("movie-edit");
  // res.send("edit request route working");
});

// router.delete("/:movieId", (req, res, next) => {
//   // res.json({ id: req.params.movieId });
// });

module.exports = router;
