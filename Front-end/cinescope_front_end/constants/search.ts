import { genres } from "./genres";

export const DEFAULT_SEARCH_OPTIONS = {
  // primary_release_year: new Date().getFullYear(),
  page: 1,
  include_adult: true,
  region: "US",
  year: new Date().getFullYear(),
  query: "",
  // genre: genres[0],
};
