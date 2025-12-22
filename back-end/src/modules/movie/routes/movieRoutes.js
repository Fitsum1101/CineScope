// movieRoutes code
const router = require("express").Router();
const movieController = require("../controllers/movieController");
const authenticate = require("../../../middleware/authMiddleware");
const authorize = require("../../../middleware/authorize");
const validate = require("../../../middleware/validatorMiddleware");
const movieValidation = require("../validations/movieValidation");

// Public routes - no authentication required
router
  .route("/now-playing")
  .get(
    validate(movieValidation.getMovies),
    movieController.getNowPlayingMovies
  );

router
  .route("/popular")
  .get(validate(movieValidation.getMovies), movieController.getPopularMovies);

router
  .route("/top-rated")
  .get(validate(movieValidation.getMovies), movieController.getTopRatedMovies);

router
  .route("/upcoming")
  .get(validate(movieValidation.getMovies), movieController.getUpcomingMovies);

router
  .route("/search")
  .get(validate(movieValidation.searchMovies), movieController.searchMovies);

router
  .route("/discover")
  .get(
    validate(movieValidation.discoverMovies),
    movieController.discoverMovies
  );

router
  .route("/trending")
  .get(
    validate(movieValidation.getTrendingMovies),
    movieController.getTrendingMovies
  );

// Movie details and related routes
router
  .route("/:id")
  .get(
    validate(movieValidation.movieIdParam),
    validate(movieValidation.getMovieDetails),
    movieController.getMovieDetails
  );

router
  .route("/:id/credits")
  .get(validate(movieValidation.movieIdParam), movieController.getMovieCredits);

router
  .route("/:id/reviews")
  .get(
    validate(movieValidation.movieIdParam),
    validate(movieValidation.getMovieReviews),
    movieController.getMovieReviews
  );

router
  .route("/:id/videos")
  .get(validate(movieValidation.movieIdParam), movieController.getMovieVideos);

router
  .route("/:id/similar")
  .get(
    validate(movieValidation.movieIdParam),
    validate(movieValidation.getRelatedMovies),
    movieController.getSimilarMovies
  );

router
  .route("/:id/recommendations")
  .get(
    validate(movieValidation.movieIdParam),
    validate(movieValidation.getRelatedMovies),
    movieController.getMovieRecommendations
  );

router
  .route("/:id/images")
  .get(
    validate(movieValidation.movieIdParam),
    validate(movieValidation.getMovieImages),
    movieController.getMovieImages
  );

router
  .route("/genre/:genreId")
  .get(
    validate(movieValidation.genreIdParam),
    validate(movieValidation.getMoviesByGenre),
    movieController.getMoviesByGenre
  );

router
  .route("/watchlist")
  .post(
    authenticate,
    authorize(["user", "admin"]),
    movieController.addToWatchlist
  )
  .get(
    authenticate,
    authorize(["user", "admin"]),
    validate(movieValidation.movieIdParam),
    movieController.getMovieWatchList
  );

router
  .route("/:id/watched_movie")
  .post(
    authenticate,
    authorize(["user", "admin"]),
    validate(movieValidation.movieIdParam),
    validate(movieValidation.toggleWatchedMovie),
    movieController.toggleWatchedMovie
  );

module.exports = router;
