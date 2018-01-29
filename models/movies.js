const axios = require("axios");

const Movies = {};

//fetch movie data from the omdb API: https://www.omdbapi.com/
Movies.allMovies = (req, res, next) => {
  axios({
    url: "http://www.omdbapi.com/?t=bad+boys+ii&apikey=a28799f5",
    method: "get"
  })
    .then(response => {
      //store the data we got back from the server in
      //res.locals and then call next()
      res.locals.allMoviesData = response.data;
      console.log(response.data);
      next();
    })
    .catch(err => {
      console.log("error encounter in Movies.allMovies. error: ", err);
    });
};

Movies.allMovies2 = (req, res, next) => {
  axios({
    url: "http://www.omdbapi.com/?t=children+of+men&apikey=a28799f5",
    method: "get"
  })
    .then(response => {
      //store the data we got back from the server in
      //res.locals and then call next()
      res.locals.allMoviesData2 = response.data;
      console.log(response.data);
      next();
    })
    .catch(err => {
      console.log("error encounter in Movies.allMovies2. error: ", err);
    });
};

Movies.allMovies3 = (req, res, next) => {
  axios({
    url: "http://www.omdbapi.com/?t=28+days+later...&apikey=a28799f5",
    method: "get"
  })
    .then(response => {
      //store the data we got back from the server in
      //res.locals and then call next()
      res.locals.allMoviesData3 = response.data;
      console.log(response.data);
      next();
    })
    .catch(err => {
      console.log("error encounter in Movies.allMovies3. error: ", err);
    });
};

Movies.allMovies4 = (req, res, next) => {
  axios({
    url: "http://www.omdbapi.com/?i=tt0071562&apikey=a28799f5",
    method: "get"
  })
    .then(response => {
      //store the data we got back from the server in
      //res.locals and then call next()
      res.locals.allMoviesData4 = response.data;
      console.log(response.data);
      next();
    })
    .catch(err => {
      console.log("error encounter in Movies.allMovies4. error: ", err);
    });
};

Movies.allMovies5 = (req, res, next) => {
  axios({
    url: "http://www.omdbapi.com/?t=pulp+fiction&apikey=a28799f5",
    method: "get"
  })
    .then(response => {
      //store the data we got back from the server in
      //res.locals and then call next()
      res.locals.allMoviesData5 = response.data;
      console.log(response.data);
      next();
    })
    .catch(err => {
      console.log("error encounter in Movies.allMovies5. error: ", err);
    });
};

module.exports = Movies;
