// analyticsRoutes code
const router = require("express").Router();

const analyticsController = require("../controllers/analyticsController");

router.get("/dashboard-report", analyticsController.getAnalyticsReport);

module.exports = router;
