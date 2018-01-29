DROP TABLE IF EXISTS moviestowatch;

CREATE TABLE moviestowatch (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  year INTEGER,
  imdb INTEGER,
  rottentomatoes INTEGER,
  anticipation INTEGER,
  poster TEXT
);