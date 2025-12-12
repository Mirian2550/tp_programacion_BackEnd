const fs = require("fs").promises;
const path = require("path");

//Definición de ruta de la DB
const DB_PATH = path.join(__dirname, "..", "db", "movies.json");

//HELPERS
async function readMovies() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeMovies(movies) {
  await fs.writeFile(DB_PATH, JSON.stringify(movies), "utf-8");
}

//CONTROLLERS

async function getAllMovies(req, res) {
  try {
    const movies = await readMovies();
    const activeMovies = movies.filter((m) => m.isDeleted !== true); // Lee correctamente el query parameter 'genre'

    const filterGenre = req.query.genre;

    if (filterGenre) {
      const filteredMovies = activeMovies.filter(
        (movie) => movie.genre.toLowerCase() === filterGenre.toLowerCase()
      );

      if (filteredMovies.length === 0) {
        return res.status(404).json({
          mensaje: `No se han encontrado películas en el género: ${filterGenre}`,
        });
      }

      return res.json(filteredMovies);
    }

    res.json(activeMovies);
  } catch (err) {
    console.log("Error al leer el archivo: ", err);

    res.status(500).send("Error interno del servidor");
  }
}

async function getMoviesById(req, res) {
  try {
    const movies = await readMovies();
    const idParam = req.params.id;
    const id = parseInt(idParam);

    if (Number.isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({ message: "ID no válido! Debe ser un número positivo." });
    }

    const movie = movies.find((movie) => movie.id === id);

    if (!movie || movie.isDeleted === true) {
      return res.status(404).json({ message: "La película no existe" });
    }

    res.json(movie);
  } catch (err) {
    console.error("Error al leer el archivo: ", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function createMovie(req, res) {
  try {
    const movies = await readMovies();

    const { titulo, genero, anio, duracion, image_url, idioma, descripcion } =
      req.body;

    if (
      !titulo ||
      !genero ||
      !anio ||
      !duracion ||
      !image_url ||
      !idioma ||
      !descripcion
    ) {
      return res
        .status(400)
        .json({ message: "Por favor, completa los datos obligatorios" });
    }

    if (
      typeof titulo !== "string" ||
      typeof descripcion !== "string" ||
      typeof genero !== "string" ||
      typeof idioma !== "string" ||
      typeof image_url !== "string"
    ) {
      return res.status(400).json({
        message:
          "Los campos de texto (título, descripción, género, idioma, URL de imagen) deben ser en formato texto.",
      });
    }

    const parsedAnio = parseInt(anio, 10);
    const parsedDuracion = parseInt(duracion, 10);

    const currentYear = new Date().getFullYear();

    if (isNaN(parsedAnio) || parsedAnio > currentYear || parsedAnio <= 0) {
      return res.status(400).json({
        message: `El año debe ser entre 0 y ${currentYear}`,
      });
    }

    if (isNaN(parsedDuracion) || parsedDuracion <= 0) {
      return res.status(400).json({
        message: "La duración debe ser un número entero positivo (en minutos).",
      });
    }

    const exist = movies.some(
      (movie) =>
        movie.title.toLowerCase() === titulo.toLowerCase() &&
        movie.year === parsedAnio
    );

    if (exist) {
      return res
        .status(409)
        .json({ message: "Esa película ya existe en la base de datos" });
    }

    const maxID = movies.length > 0 ? Math.max(...movies.map((m) => m.id)) : 0;
    const id = maxID + 1;

    const newMovie = {
      id: id,
      title: titulo,
      genre: genero,
      year: parsedAnio,
      duration_min: parsedDuracion,
      image_url: image_url,
      language: idioma,
      description: descripcion,
      isDeleted: false,
    };

    movies.push(newMovie);

    await writeMovies(movies);

    res.status(201).json({ message: "Película agregada correctamente" });
  } catch (err) {
    console.error("Error en la actualización", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function deleteMovie(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID no válido!" });
    }

    const movies = await readMovies();

    const index = movies.findIndex((b) => b.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    if (movies[index].active === false) {
      return res
        .status(400)
        .json({ message: "La película no se encuentra disponible" });
    }

    movies[index].active = false;

    await writeMovies(movies);

    return res.json({
      message: "Película eliminada correctamente!",
      libro: movies[index],
    });
  } catch (err) {
    console.error("Error del delete /movies/:id", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function updateMovie(req, res) {}

module.exports = {
  getAllMovies,
  getMoviesById,
  createMovie,
  deleteMovie,
  updateMovie,
};
