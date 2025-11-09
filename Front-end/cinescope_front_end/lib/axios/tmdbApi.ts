import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  ...options,
});
