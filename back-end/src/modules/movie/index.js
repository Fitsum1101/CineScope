const movieController = require("./controllers/movieController");
const movieModel = require("./models/movieModel");
const movieRoutes = require("./routes/movieRoutes");
const movieService = require("./services/movieService");
const movieValidation = require("./validations/movieValidation");

module.exports = {
  movieController,
  movieModel,
  movieRoutes,
  movieService,
  movieValidation,
};
