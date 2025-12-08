import { createAxiosInstance } from "@/utils/axios";

const proxyUrl = "https://api.allorigins.win/raw?url=";
const tmdbUrl = `https://api.themoviedb.org/3/`;

const axiosInstance = createAxiosInstance({
  url: `${tmdbUrl}`,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers?.set("Content-Type", "application/json");
  config.headers?.set("Accept", "application/json");

  // config.headers.set(
  //   "Authorization",
  //   "8fd7da46674eb421b7ed2fadd60f0ab0eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmQ3ZGE0NjY3NGViNDIxYjdlZDJmYWRkNjBmMGFiMCIsIm5iZiI6MTc2MjQzNzY3OC43MDcsInN1YiI6IjY5MGNhYTJlM2IyZWRjNDg0ZTA3MTU3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ul8NZBhxn_B7s_vbPYENfhfNwsF63yBDonoBLEleaNQ"
  // );\

  config.params = {
    ...config.params,
    api_key: "8fd7da46674eb421b7ed2fadd60f0ab0",
  };

  return config;
});

// axiosInstance.interceptors.response.use(undefined, async (error) => {
//   console.log(error);
//   if (error.response?.status === 401) {
//     return axiosInstance(error.config);
//   }

//   throw error;
// });

export default axiosInstance;
