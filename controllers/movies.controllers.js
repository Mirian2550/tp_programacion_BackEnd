const fs = require("fs").promises;
const path = require("path");

//Definición de ruta de la DB
const DB_PATH = path.join(__dirname, "..", "db", "movies.json");

//HELPERS
async function readMovies() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeMovies() {
  await fs.writeFile(DB_PATH, "utf-8");
}
// Esa de arriba o esta:
// async function writeMovies(X) {
//     await fs.writeFile(DB_PATH, JSON.stringify(X), "utf-8");
//   }

async function getAllMovies(req, res) {
  try {
    const movies = await readMovies();

    const activeMovies = movies.filter((m) => m.active !== false);

    const category = req.query.category;

    if (category) {
      const filteredMovies = activeMovies.filter(
        (movie) => movie.category.toLowerCase() === category.toLowerCase()
      );

      if (filteredMovies.length === 0) {
        return res

          .status(404)

          .json({ mensaje: "No se han encontrado películas de esa categoría" });
      }

      return res.json(filteredMovies);
    }

    res.json(activeMovies);
  } catch (err) {
    console.log("Error al leer el archivo: ", err);

    res.status(500).send("Error interno del servidor");
  }
}

async function getMoviesById(req, res) {}

async function createMovie(req, res) {
  try {
    const movies = await readMovies();

    const { titulo, genero, anio, descripcion } = req.body;

    if (titulo || genero || anio || descripcion) {
      return res
        .status(400)
        .json({ message: "Por favor, completa los datos obligatorios" });
    }

    if (typeof titulo !== "string" || typeof autor !== "string") {
      return res
        .status(400)
        .json({ message: "El título y el autor deben ser en formato texto" });
    }

    const currentYear = new Date().getFullYear();

    if (isNaN(anio) || movieData.anio > currentYear || movieData.anio <= 0) {
      return res.status(400).json({
        message: `El año debe ser entre 0 y ${currentYear}`,
      });
    }

    const exist = movies.some(
      (movie) =>
        movie.title.toLowerCase() === movieData.titulo.toLowerCase() &&
        movie.year.toLowerCase() === movieData.anio.toLowerCase()
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
      year: anio,
      duration_min: duracion,
      language: idioma,
      description: descripcion,
    };

    movies.push(newMovie);

    await writeMovies(movies);

    req.status(201).json({ message: "Película agregada correctamente" });
  } catch (err) {
    console.error("Error en la actualización", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function deleteMovie(req, res) {}

async function updateMovie(req, res) {}

module.exports = {
  getAllMovies,
  getMoviesById,
  createMovie,
  deleteMovie,
  updateMovie,
};
