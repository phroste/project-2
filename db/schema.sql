DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  year INTEGER,
  imdb INTEGER,
  rottentomatoes INTEGER,
  anticipation INTEGER,
  poster TEXT
);