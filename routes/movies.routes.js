const express = require("express");

const router = express.Router(
    getAllMovies,
    getMoviesById,
    createMovie,
    deleteMovie,
    updateMovie,
) = require("../controllers/movies.controllers")

// Faltaria completar rutas
router.get("/...", getAllMovies);
router.get("/...../:id", getMoviesById);
router.post("/...", createMovie);
router.delete("/...../:id", deleteMovie);
router.put("/..../:id", updateMovie);

module.exports = router;