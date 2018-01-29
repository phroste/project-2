//To talk to the database we need a connection
const db = require("../db/index.js");
//Call out to an external API using axios
const axios = require("axios");

const movieModel = {};

//seed the database

//helper function for seeding the movie data
function movieNameSeedStep(movieData) {
  //because the returning API data is an object, a forEach or map method wouldn't work? maybe Object.entries()
  // movieData(movie => {
  // console.log(movie);
  db
    .none(
      "INSERT INTO movies (title, year, imdb, rottentomatoes, anticipation, poster) VALUES ($1, $2, $3, $4, $5, $6);",
      [
        movieData.title,
        movieData.year,
        movieData.imdb,
        movieData.rottentomatoes,
        movieData.anticipation,
        movieData.poster
      ]
    )
    .catch(err => {
      console.log(
        "Error encounted in movieNameSeedStep pgpromise call, error:",
        err
      );
    });
  // });
  //if there's a link to more movie information, recursively follow it
  if (movieData.next) {
    axios({
      method: "get",
      url: movieData.next
    })
      .then(response => {
        //recursively call movieNameSeedStep
        movieNameSeedStep(response.data);
      })
      .catch(err => {
        console.log(
          "Error encountered in axios call in movieNameSeedStep, error:",
          err
        );
      });
  }
}

//not middleware. this is a function we'll use in db/seed.js to set up the database
movieModel.seedAllMovieNames = function() {
  axios({
    method: "get",
    url: "http://www.omdbapi.com/?t=bad+boys&apikey=a28799f5"
  })
    .then(response => {
      movieNameSeedStep(response.data);
      console.log(response.data);
    })
    .catch(err => {
      console.log("Error encountered in movieModel.seedAllMovieNames:", err);
    });
};

//middleware
movieModel.allmovie = (req, res, next) => {
  db
    .manyOrNone("SELECT * FROM movies ORDER BY title")
    .then(movieResults => {
      res.locals.allMovieData = movieResults;
      console.log(movieResults);
      next();
    })
    .catch(err => {
      console.log("error encountered in movieModel.allmovie, error:", error);
      next(error);
    });
};

movieModel.movieById = (req, res, next) => {
  console.log("in movieModel.movieById");
  db
    .one("SELECT * FROM movies WHERE movies.id = $1", [req.params.movieId])
    .then(data => {
      console.log("made it here");
      const url = data.url;
      axios({
        method: "get",
        url: url
      }).then(result => {
        const individualMovieData = {
          title: result.data.Title,
          year: result.data.Year,
          imdb: result.data.Ratings[0]["Value"],
          rottentomatoes: result.data.Ratings[1]["Value"],
          anticipation: result.data.Metascore,
          poster: result.data.Poster
        };
        res.locals.individualMovieData = individualMovieData;
        next();
      });
    })
    .catch(err => {
      console.log("error encountered in movieModel.movieById, error:", error);
      next(err);
    });
};

module.exports = movieModel;
