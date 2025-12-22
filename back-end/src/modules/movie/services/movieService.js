// movieService.js
require("dotenv").config();
const axios = require("axios");

// Create axios instance
const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDPI_TOKEN}`,
  },
  timeout: 10000,
});

// Movie Functions
const movieService = {
  // Get now playing movies
  getNowPlayingMovies: async (page = 1, region = "US") => {
    const response = await tmdbApi.get("/movie/now_playing", {
      params: { page, region },
    });

    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await tmdbApi.get("/movie/popular", {
      params: { page },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    const response = await tmdbApi.get("/movie/top_rated", {
      params: { page },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get upcoming movies
  getUpcomingMovies: async (page = 1, region = "US") => {
    const response = await tmdbApi.get("/movie/upcoming", {
      params: { page, region },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get movie details by ID
  getMovieDetails: async (movieId, appendToResponse = []) => {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: appendToResponse.join(","),
      },
    });
    return response.data;
  },

  // Search movies
  searchMovies: async (query, page = 1, includeAdult = false) => {
    const response = await tmdbApi.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: includeAdult,
      },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get movie credits
  getMovieCredits: async (movieId) => {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return {
      cast: response.data.cast,
      crew: response.data.crew,
    };
  },

  // Get movie reviews
  getMovieReviews: async (movieId, page = 1) => {
    const response = await tmdbApi.get(`/movie/${movieId}/reviews`, {
      params: { page },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get movie videos (trailers, teasers, etc.)
  getMovieVideos: async (movieId) => {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    return response.data.results;
  },

  // Get similar movies
  getSimilarMovies: async (movieId, page = 1) => {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`, {
      params: { page },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get movie recommendations
  getMovieRecommendations: async (movieId, page = 1) => {
    const response = await tmdbApi.get(`/movie/${movieId}/recommendations`, {
      params: { page },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Discover movies with filters
  discoverMovies: async (filters = {}, page = 1) => {
    const response = await tmdbApi.get("/discover/movie", {
      params: { ...filters, page },
    });
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  },

  // Get movie images
  getMovieImages: async (movieId, includeImageLanguage = null) => {
    const response = await tmdbApi.get(`/movie/${movieId}/images`, {
      params: { include_image_language: includeImageLanguage },
    });
    return response.data;
  },
};

module.exports = movieService;
