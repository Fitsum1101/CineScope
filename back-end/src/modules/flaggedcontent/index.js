const flaggedcontentController = require("./controllers/flaggedcontentController");
const flaggedcontentModel = require("./models/flaggedcontentModel");
const flaggedcontentRoutes = require("./routes/flaggedcontentRoutes");
const flaggedcontentService = require("./services/flaggedcontentService");
const flaggedcontentValidation = require("./validations/flaggedcontentValidation");

module.exports = {
  flaggedcontentController,
  flaggedcontentModel,
  flaggedcontentRoutes,
  flaggedcontentService,
  flaggedcontentValidation,
};
