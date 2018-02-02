const router = require("express").Router();
const Movies = require("../models/movies.js");
const movie = require("../models/movie-seed.js");
const moment = require("moment");

router.get(
  "/",
  Movies.allMovies,
  Movies.allMovies2,
  Movies.allMovies3,
  Movies.allMovies4,
  Movies.allMovies5,
  movie.allLibrary,
  (req, res, next) => {
    console.log("hitting movies/");
    const currentTime = moment().format("LLL");
    res.render("movies", {
      allMoviesData: res.locals.allMoviesData,
      allMoviesData2: res.locals.allMoviesData2,
      allMoviesData3: res.locals.allMoviesData3,
      allMoviesData4: res.locals.allMoviesData4,
      allMoviesData5: res.locals.allMoviesData5,
      allLibrary: res.locals.movieData,
      time: currentTime
    });
  }
);

//gets and renders add/search movies page
router.get("/search", (req, res, next) => {
  // res.send("this 'movies/search' route works");
  res.render("search");
});

//gets and renders individual movie pages
router.get("/:movieId", movie.findById, (req, res, next) => {
  res.render("movie-new");
});

//get request sent from the server to client
//edit page for each individual movie
router.get("/:movieId/edit", movie.findById, (req, res, next) => {
  // res.send("/:newId route works");
  res.render("movie-edit");
});

//post request. when user clicks 'add movie to list' button on search movie page, this adds that searched movie to main movies list page
router.post("/movie-new", movie.create, (req, res) => {
  res.redirect("/movies");
});

//post request for movie comments. not working yet
router.post("/:movieId", movie.addReview, movie.addReview, (req, res, next) => {
  res.redirect("/movies");
});

router.delete("/:id", movie.destroy, (req, res, next) => {
  res.json({ id: req.params.id });
});

//put request is used to edit/upate movie. updates anticipation for that particular movie in movies table
router.put("/:movieId", movie.update, (req, res, next) => {
  res.json(res.locals.updatedMovieData);
});

module.exports = router;
