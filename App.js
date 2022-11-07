require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const filmsHandlers = require("./filmsHandlers");

app.get("/api/films", filmsHandlers.getFilms);
app.post("/api/films", filmsHandlers.postFilms);
app.put("/api/films/:id", filmsHandlers.updateFilms);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});