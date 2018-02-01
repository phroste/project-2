DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  year INTEGER,
  imdb VARCHAR(255),
  anticipation INTEGER,
  poster TEXT
);

-- DROP TABLE IF EXISTS reviews ;

-- CREATE TABLE reviews (
--   id SERIAL PRIMARY KEY REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE,
--   comment VARCHAR(255)
-- );