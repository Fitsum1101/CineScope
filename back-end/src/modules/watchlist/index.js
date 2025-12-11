const watchlistController = require("./controllers/watchlistController");
const watchlistModel = require("./models/watchlistModel");
const watchlistRoutes = require("./routes/watchlistRoutes");
const watchlistService = require("./services/watchlistService");
const watchlistValidation = require("./validations/watchlistValidation");

module.exports = {
  watchlistController,
  watchlistModel,
  watchlistRoutes,
  watchlistService,
  watchlistValidation,
};
