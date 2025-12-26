// reviewRoutes code

const reviewController = require("../controllers/reviewController");

const router = require("express").Router();

router
  .route("/")
  .get(reviewController.createReview)
  .post(reviewController.createReview);

router.get("/movie/:movieId", reviewController.getReviewsByMovieId);

module.exports = router;
