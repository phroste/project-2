// We don't have to write seed files in sql! We can also
// use JavaScript... and that JavaScript can use our model.

// We'll use the movieModel.
const movieModel = require("../models/movieseed");

movieModel.seedAllMovieNames();
