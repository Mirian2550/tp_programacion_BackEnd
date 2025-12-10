const fs = require("fs").promises;
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "db", "movies.json");

async function readMovies() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}
