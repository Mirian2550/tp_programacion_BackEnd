const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getMoviesById,
  createMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movies.controllers");

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMoviesById);
router.post("/movies", createMovie);
router.delete("/movies/:id", deleteMovie);
router.put("/movies/:id", updateMovie);

module.exports = router;
