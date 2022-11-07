const database = require("./database");


const getFilms = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postFilms = (req, res) => {
  const { title, genre, year } = req.body;
  database
    .query(
      "INSERT INTO movies(title, genre, year) VALUES (?, ?, ?)",
      [title, genre, year]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

const updateFilms = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(
      "UPDATE movies SET ? WHERE id = ?",
      [req.body, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};


module.exports = {
  getFilms,
  postFilms,
  updateFilms
};