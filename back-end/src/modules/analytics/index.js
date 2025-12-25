const analyticsController = require("./controllers/analyticsController");
const analyticsModel = require("./models/analyticsModel");
const analyticsRoutes = require("./routes/analyticsRoutes");
const analyticsService = require("./services/analyticsService");
const analyticsValidation = require("./validations/analyticsValidation");

module.exports = {
  analyticsController,
  analyticsModel,
  analyticsRoutes,
  analyticsService,
  analyticsValidation,
};
