import catchAsync from "../../../utils/catchAsync.js";
import tmdbService from "../services/movieService.js";

const getPopularMovies = catchAsync(async (req, res) => {
  const page = req.query.page || 1;
  const movies = await tmdbService.getPopularMovies(page);
  res.status(200).json({ success: true, data: movies });
});
const getMovieById = catchAsync(async (req, res) => {
  const movieId = req.params.id;
  const movie = await tmdbService.getMovieById(movieId);
  res.status(200).json({ success: true, data: movie });
});
const searchMovies = catchAsync(async (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  const movies = await tmdbService.searchMovies(query, page);
  res.status(200).json({ success: true, data: movies });
});
const getMoviesByGenre = catchAsync(async (req, res) => {
  const genreId = req.params.genreId;
  const page = req.query.page || 1;
  const movies = await tmdbService.getMoviesByGenre(genreId, page);
  res.status(200).json({ success: true, data: movies });
});

module.exports = {
  getMovieById,
  getMoviesByGenre,
  getPopularMovies,
  searchMovies,
};
