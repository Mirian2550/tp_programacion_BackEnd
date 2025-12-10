const fs = require("fs").promises;
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "db", "movies.json");

async function readMovies() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeMovies() {
  await fs.writeFile(DB_PATH, "utf-8");
}

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

    const maxID = movies.length > 0 ? Math.max(...books.map((m) => m.id)) : 0;
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

    await writeMovies(books);

    req.status(201).json({ message: "Película agregada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error interno del servidor" });
  }
}

module.exports = {
  createMovie,
};
