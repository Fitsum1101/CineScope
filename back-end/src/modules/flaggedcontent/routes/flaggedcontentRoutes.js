// flaggedcontentRoutes code

const router = require("express").Router();

const flaggedcontentController = require("../controllers/flaggedcontentController");

router
  .route("/")
  .post(flaggedcontentController.createFlaggedContent)
  .get(flaggedcontentController.getAllFlaggedContents);

router.delete("/:id", flaggedcontentController.resolveFlageContent);

module.exports = router;
