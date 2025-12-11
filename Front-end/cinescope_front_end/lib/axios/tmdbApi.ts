import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ3ZGE0NjY3NGViNDIxYjdlZDJmYWRkNjBmMGFiMCIsIm5iZiI6MTc2MjQzNzY3OC43MDcsInN1YiI6IjY5MGNhYTJlM2IyZWRjNDg0ZTA3MTU3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ul8NZBhxn_B7s_vbPYENfhfNwsF63yBDonoBLEleaNQ`,
  },
};

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  ...options,
});
