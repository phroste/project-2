const db = require("../db/index.js");

const movie = {};

movie.create = (req, res, next) => {
  db
    .one(
      "INSERT INTO movies (title, year, imdb, rottentomatoes, anticipation, poster) VALUES ($1, $2, $3, $4, $5, $6);"[
        (req.body.title,
        req.body.year,
        req.body.imdb,
        req.body.rottentomatoes,
        req.body.anticipation,
        req.body.price)
      ]
    )
    .then(data => {
      res.locals.newMovieId = data.id;
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.create. Error:", error);
      next(error);
    });
};

module.exports = movie;
