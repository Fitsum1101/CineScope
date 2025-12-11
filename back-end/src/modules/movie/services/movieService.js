const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

class TMDbService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY;
    this.baseURL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
    this.timeout = 5000;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      params: {
        api_key: this.apiKey,
        language: "en-US",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async getPopularMovies(page = 1) {
    try {
      const response = await this.client.get("/movie/popular", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMovieById(movieId) {
    try {
      const response = await this.client.get(`/movie/${movieId}`, {
        params: {
          append_to_response: "credits,videos,similar",
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchMovies(query, page = 1) {
    try {
      const response = await this.client.get("/search/movie", {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await this.client.get("/discover/movie", {
        params: {
          with_genres: genreId,
          page,
          sort_by: "popularity.desc",
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      console.error("TMDB API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
      throw new Error(
        `TMDB API Error: ${error.response.status} - ${
          error.response.data.status_message || "Unknown error"
        }`
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("TMDB API is not responding");
    } else {
      console.error("Request setup error:", error.message);
      throw new Error(`Failed to fetch from TMDB: ${error.message}`);
    }
  }
}

// Export singleton instance
export default new TMDbService();
