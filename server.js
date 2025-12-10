const express = require("express");

const cors = require("cors");

const moviesRoutes = require("./routes/movies.routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(moviesRoutes);

app.use((req, res) => {
  res.status(404).send("Página no encontrada :(");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${PORT}`);
});
