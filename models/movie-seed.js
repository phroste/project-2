const db = require("../db/index.js");

const movie = {};

movie.findById = (req, res, next) => {
  const id = req.params.movieId;
  db
    .one("SELECT * FROM movies WHERE movies.id = ${id}", { id: id })
    .then(data => {
      res.locals.movieData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.findById. Error:", error);
      next(error);
    });
};

movie.create = (req, res, next) => {
  // res.send(req.body);
  // console.log("working"  + req.body);
  db
    .one(
      "INSERT INTO movies (title, year, imdb, rottentomatoes, anticipation, poster) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
      [
        req.body.title,
        req.body.year,
        req.body.imdb,
        req.body.rottentomatoes,
        req.body.anticipation,
        req.body.price
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

movie.destroy = (req, res, next) => {
  db
    .none("DELETE FROM movies WHERE id = $1", [req.params.movieId])
    .then(() => {
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.destroy. error:", error);
      next(error);
    });
};

movie.update = (req, res, next) => {
  db
    .one(
      "UPDATE movies SET title = $1, year = $2, imdb = $3, rottentomatoes = $4, anticipation = $5, poster = $6 WHERE id = $7 RETURNING *;",
      [
        req.body.title,
        req.body.year,
        req.body.imdb,
        req.body.rottentomatoes,
        req.body.anticipation,
        req.body.poster,
        req.params.movieId
      ]
    )
    .then(data => {
      res.locals.updatedMovieData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.update. Error:", error);
      next(error);
    });
};
module.exports = movie;
