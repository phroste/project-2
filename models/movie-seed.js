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

//retrieves all user submitted movies from movies table
movie.allLibrary = (req, res, next) => {
  db
    .manyOrNone("SELECT * FROM movies")
    .then(data => {
      res.locals.movieData = data;
      console.log("****************", data);
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.findById. Error:", error);
      next(error);
    });
};

movie.create = (req, res, next) => {
  // res.send(req.body);
  console.log("working", req.body);
  db
    // .one(
    .manyOrNone(
      // "INSERT INTO movies (title, year, imdb, rottentomatoes, anticipation, poster) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
      "INSERT INTO movies (title, year, imdb, anticipation, poster) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [
        req.body.title,
        req.body.year,
        req.body.imdb,
        req.body.anticipation,
        req.body.poster
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
  console.log("+++++++++++++++++++++++", req.params);
  db
    .none("DELETE FROM movies WHERE id = $1", [req.params.id])
    .then(() => {
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.destroy. error:", error);
      next(error);
    });
};

movie.update = (req, res, next) => {
  console.log(req.body);
  db
    .one("UPDATE movies SET anticipation = $1 WHERE id = $2 RETURNING *;", [
      req.body.anticipation,
      req.params.movieId
    ])
    .then(data => {
      res.locals.updatedMovieData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.update. Error:", error);
      next(error);
    });
};

// movie.addReview = (req, res, next) => {
//   // res.send(req.body);
//   console.log("working", req.body);
//   db
//     .one("INSERT INTO reviews (comment) VALUES ($1) RETURNING *;", [
//       req.body.comment
//     ])
//     .then(data => {
//       res.locals.newMovieId = data.id;
//       next();
//     })
//     .catch(error => {
//       console.log("error encountered in movie.addReview. Error:", error);
//       next(error);
//     });
// };

movie.addReview = (req, res, next) => {
  // res.send(req.body);
  console.log("working", req.body);
  db
    .one("INSERT INTO reviews (comment) VALUES ($1) RETURNING *;", [
      req.body.comment
    ])
    .then(data => {
      res.locals.comment = data.id;
      console.log("$$$$$$$$$$$$$$$$$$$$$$$", data);
      next();
    })
    .catch(error => {
      console.log("error encountered in movie.addReview. Error:", error);
      next(error);
    });
};

module.exports = movie;
