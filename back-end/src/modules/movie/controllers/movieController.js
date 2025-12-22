// movieController code
const ApiResponse = require("../../../utils/apiResponse");
const catchAsync = require("../../../utils/catchAsync");
const ApiError = require("../../../utils/apiError");
const movieService = require("../services/movieService");
const { StatusCodes } = require("http-status-codes");

// Get now playing movies
const getNowPlayingMovies = catchAsync(async (req, res) => {
  const { page = 1, region = "US" } = req.query;
  const movies = await movieService.getNowPlayingMovies(page, region);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Now playing movies retrieved successfully"
      )
    );
});

// Get popular movies
const getPopularMovies = catchAsync(async (req, res) => {
  const { page = 1 } = req.query;
  const movies = await movieService.getPopularMovies(page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Popular movies retrieved successfully"
      )
    );
});

// Get top rated movies
const getTopRatedMovies = catchAsync(async (req, res) => {
  const { page = 1 } = req.query;
  const movies = await movieService.getTopRatedMovies(page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Top rated movies retrieved successfully"
      )
    );
});

// Get upcoming movies
const getUpcomingMovies = catchAsync(async (req, res) => {
  const { page = 1, region = "US" } = req.query;
  const movies = await movieService.getUpcomingMovies(page, region);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Upcoming movies retrieved successfully"
      )
    );
});

// Get movie details
const getMovieDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { appendToResponse = [] } = req.query;

  const appendArray = Array.isArray(appendToResponse)
    ? appendToResponse
    : appendToResponse.split(",").filter((item) => item.trim());

  const movie = await movieService.getMovieDetails(id, appendArray);
  if (!movie) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Movie not found");
  }
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movie,
        "Movie details retrieved successfully"
      )
    );
});

// Search movies
const searchMovies = catchAsync(async (req, res) => {
  const { query, page = 1, includeAdult = false } = req.query;

  if (!query) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Search query is required");
  }

  const movies = await movieService.searchMovies(query, page, includeAdult);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Movies search completed successfully"
      )
    );
});

// Get movie credits
const getMovieCredits = catchAsync(async (req, res) => {
  const { id } = req.params;
  const credits = await movieService.getMovieCredits(id);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        credits,
        "Movie credits retrieved successfully"
      )
    );
});

// Get movie reviews
const getMovieReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;
  const reviews = await movieService.getMovieReviews(id, page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        reviews,
        "Movie reviews retrieved successfully"
      )
    );
});

// Get movie videos
const getMovieVideos = catchAsync(async (req, res) => {
  const { id } = req.params;
  const videos = await movieService.getMovieVideos(id);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        videos,
        "Movie videos retrieved successfully"
      )
    );
});

// Get similar movies
const getSimilarMovies = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;
  const movies = await movieService.getSimilarMovies(id, page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Similar movies retrieved successfully"
      )
    );
});

// Get movie recommendations
const getMovieRecommendations = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;
  const movies = await movieService.getMovieRecommendations(id, page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Movie recommendations retrieved successfully"
      )
    );
});

// Discover movies
const discoverMovies = catchAsync(async (req, res) => {
  const { page = 1, ...filters } = req.query;
  const movies = await movieService.discoverMovies(filters, page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, movies, "Movies discovered successfully")
    );
});

// Get movie images
const getMovieImages = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { includeImageLanguage = null } = req.query;
  const images = await movieService.getMovieImages(id, includeImageLanguage);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        images,
        "Movie images retrieved successfully"
      )
    );
});

// Get trending movies
const getTrendingMovies = catchAsync(async (req, res) => {
  const { timeWindow = "week", page = 1 } = req.query;

  if (!["day", "week"].includes(timeWindow)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Time window must be 'day' or 'week'"
    );
  }

  // Note: You'll need to add this function to your movieService
  const movies = await movieService.getTrendingMovies(timeWindow, page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Trending movies retrieved successfully"
      )
    );
});

// Get movies by genre
const getMoviesByGenre = catchAsync(async (req, res) => {
  const { genreId } = req.params;
  const { page = 1 } = req.query;

  // Note: You'll need to add this function to your movieService
  const movies = await movieService.getMoviesByGenre(genreId, page);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Movies by genre retrieved successfully"
      )
    );
});

// Batch get multiple movies
const getMultipleMovies = catchAsync(async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Movie IDs are required");
  }

  const idArray = ids
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id);

  if (idArray.length === 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No valid movie IDs provided");
  }

  if (idArray.length > 20) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Maximum 20 movies per request"
    );
  }

  // Note: You'll need to add this function to your movieService
  const movies = await movieService.getMultipleMovies(idArray);
  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        movies,
        "Multiple movies retrieved successfully"
      )
    );
});

const addToWatchlist = catchAsync(async (req, res) => {
  const data = req.body;
  const user = req.user;

  const isMovieExstes = await movieService.getMovieById(data.id);

  await movieService.movieExisteInWatchedMovie(data.id, user.id);

  if (!isMovieExstes) await movieService.addMovie(data);

  await movieService.addToWatchList(data.id, user.id);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        null,
        "Movie added to watchlist successfully"
      )
    );
});

const toggleWatchedMovie = catchAsync(async (req, res) => {
  const { movieId } = req.body;
  const user = req.user;

  const movie = await movieService.movieExisteInWatchedMovie(movieId, user.id);

  await movieService.toggleWatchedMovie(movie.id, movie.isWatched);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        null,
        "movie watched status toggled successfully"
      )
    );
});

const deleteFromWatchlist = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const user = req.user;

  const movie = await movieService.movieExisteInWatchedMovie(movieId, user.id);

  await movieService.deleteFromWatchList(movie.id);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        null,
        "Movie deleted from watchlist successfully"
      )
    );
});

const getMovieWatchList = catchAsync(async (req, res) => {
  const user = req.user;

  const watchlist = await movieService.getMovieWatchlist(user.id);

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        watchlist,
        "User watchlist retrieved successfully"
      )
    );
});
module.exports = {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
  searchMovies,
  getMovieCredits,
  getMovieReviews,
  getMovieVideos,
  getSimilarMovies,
  getMovieRecommendations,
  discoverMovies,
  getMovieImages,
  getTrendingMovies,
  getMoviesByGenre,
  getMultipleMovies,
  addToWatchlist,
  toggleWatchedMovie,
  deleteFromWatchlist,
  getMovieWatchList,
};
