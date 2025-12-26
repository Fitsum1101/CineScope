const reviewController = require("./controllers/reviewController");
const reviewModel = require("./models/reviewModel");
const reviewRoutes = require("./routes/reviewRoutes");
const reviewService = require("./services/reviewService");
const reviewValidation = require("./validations/reviewValidation");

module.exports = {
  reviewController,
  reviewModel,
  reviewRoutes,
  reviewService,
  reviewValidation,
};
